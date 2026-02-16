"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { storyNarrationApi } from "@/lib/api/ceritain";
import type { StoryNarrationStatusResponse } from "@/lib/api/types";

interface PlayerContextType {
    isPlaying: boolean;
    currentPodcastId: number | null;
    narrationData: StoryNarrationStatusResponse | null;
    playbackSpeed: number;
    audioElement: HTMLAudioElement | null;
    isLoading: boolean;
    error: string | null;
    togglePlayback: () => void;
    setPlaybackSpeed: (speed: number) => void;
    playPodcast: (id: number) => Promise<void>;
    seek: (time: number) => void;
    closePlayer: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const [currentPodcastId, setCurrentPodcastId] = useState<number | null>(null);
    const [narrationData, setNarrationData] = useState<StoryNarrationStatusResponse | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

    // We use a ref for the audio object to persist it, but also store it in state to share it via context
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio element once
    useEffect(() => {
        if (typeof window !== "undefined" && !audioRef.current) {
            const audio = new Audio();
            audioRef.current = audio;
            setAudioElement(audio);

            // Setup global event listeners for the audio
            const handleEnded = () => setIsPlaying(false);
            const handlePause = () => setIsPlaying(false);
            const handlePlay = () => setIsPlaying(true);

            audio.addEventListener("ended", handleEnded);
            audio.addEventListener("pause", handlePause);
            audio.addEventListener("play", handlePlay);

            return () => {
                audio.removeEventListener("ended", handleEnded);
                audio.removeEventListener("pause", handlePause);
                audio.removeEventListener("play", handlePlay);
            };
        }
    }, []);

    // Effect to update playback speed on audio element
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackSpeed;
        }
    }, [playbackSpeed]);

    const playPodcast = async (id: number) => {
        // If playing the same podcast, do nothing (or maybe toggle? lets stick to just ensuring it's loaded)
        if (currentPodcastId === id && narrationData) {
            // Already active, just play if paused
            if (audioRef.current?.paused) {
                audioRef.current.play().catch(e => console.error("Playback failed", e));
            }
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            // 1. Fetch data
            const data = await storyNarrationApi.getStatus(id);
            setNarrationData(data);
            setCurrentPodcastId(id);

            // 2. Setup audio source
            if (audioRef.current) {
                const streamingUrl = storyNarrationApi.getStreamingUrl(id);
                audioRef.current.src = streamingUrl;
                audioRef.current.load();
                audioRef.current.playbackRate = playbackSpeed;

                // 3. Play
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } catch (err: any) {
            // Ignore AbortError as it happens when play is interrupted by pause or load
            if (err.name === 'AbortError') {
                console.log("Playback aborted");
                return;
            }
            console.error("Failed to play podcast:", err);
            setError("Failed to load podcast");
            setIsPlaying(false);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePlayback = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Playback failed", e));
        }
    };

    const seek = (time: number) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = time;
    };

    const closePlayer = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setCurrentPodcastId(null);
        setNarrationData(null);
    };

    return (
        <PlayerContext.Provider
            value={{
                isPlaying,
                currentPodcastId,
                narrationData,
                playbackSpeed,
                audioElement,
                isLoading,
                error,
                togglePlayback,
                setPlaybackSpeed,
                playPodcast,
                seek,
                closePlayer,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error("usePlayer must be used within a PlayerProvider");
    }
    return context;
}
