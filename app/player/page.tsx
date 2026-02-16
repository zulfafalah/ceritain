"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { storyNarrationApi } from "@/lib/api/ceritain";
// import type { StoryNarrationStatusResponse } from "@/lib/api/types"; // Not needed if unused directly or handled by context types
import { usePlayer } from "@/app/context/PlayerContext";

function PlayerContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const podcastId = searchParams.get("id");

    const {
        playPodcast,
        togglePlayback,
        setPlaybackSpeed,
        audioElement,
        isPlaying,
        playbackSpeed,
        narrationData,
        currentPodcastId,
        isLoading,
        error
    } = usePlayer();

    const [progress, setProgress] = useState(0);
    const [waveformHeights, setWaveformHeights] = useState<number[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isLiked, setIsLiked] = useState(false);

    // Initial play or sync
    useEffect(() => {
        if (podcastId) {
            playPodcast(parseInt(podcastId));
        }
    }, [podcastId]);

    // Update progress
    useEffect(() => {
        if (!audioElement) return;

        const updateProgress = () => {
            if (audioElement.duration) {
                setProgress((audioElement.currentTime / audioElement.duration) * 100);
            }
        };

        audioElement.addEventListener("timeupdate", updateProgress);
        // We don't need to listen to 'ended' here for playing state as context handles it,
        // but we might want to update progress to 0 or 100? context handles 'ended' -> isPlaying=false.

        return () => {
            audioElement.removeEventListener("timeupdate", updateProgress);
        };
    }, [audioElement]);

    // Generate random waveform heights
    useEffect(() => {
        const heights = Array.from({ length: 20 }, () => Math.floor(Math.random() * 14) + 3);
        setWaveformHeights(heights);
    }, []);

    // Animate waveform when playing
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setWaveformHeights(
                Array.from({ length: 20 }, () => Math.floor(Math.random() * 14) + 3)
            );
        }, 300);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const cycleSpeed = () => {
        const speeds = [1, 1.25, 1.5, 1.75, 2];
        const currentIndex = speeds.indexOf(playbackSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        setPlaybackSpeed(speeds[nextIndex]);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioElement) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newProgress = (x / rect.width) * 100;
        const newTime = (newProgress / 100) * audioElement.duration;

        audioElement.currentTime = newTime;
        setProgress(newProgress);
    };

    const showToastNotification = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleShare = async () => {
        if (!narrationData) return;

        const shareUrl = `${window.location.origin}/player?id=${podcastId}`;
        const shareData = {
            title: narrationData.title,
            text: `Listen to "${narrationData.title}" on Ceritain`,
            url: shareUrl,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareUrl);
                showToastNotification("Link copied to clipboard!");
            }
        } catch (error) {
            if (error instanceof Error && error.name !== "AbortError") {
                console.error("Error sharing:", error);
                try {
                    await navigator.clipboard.writeText(shareUrl);
                    showToastNotification("Link copied to clipboard!");
                } catch (clipboardError) {
                    console.error("Clipboard error:", clipboardError);
                    showToastNotification("Failed to copy link");
                }
            }
        }
    };

    const handleMinimize = () => {
        router.push('/');
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen w-full bg-[#f6f7f8] dark:bg-[#101922] flex justify-center items-center">
                <div className="animate-pulse text-[#0d141b] dark:text-white">Loading narration...</div>
            </div>
        );
    }

    // Show error state or no ID state
    if (error || !narrationData || !podcastId) {
        // Re-using existing error UI logic...
        const isNoId = !podcastId;
        const errorMessage = isNoId
            ? "No podcast selected"
            : error || "Narration not found";
        const errorDescription = isNoId
            ? "Please select a podcast from your library to start listening"
            : "We couldn't find the podcast you're looking for. It may have been deleted or the link is invalid.";

        return (
            <div className="min-h-screen w-full bg-[#f6f7f8] dark:bg-[#101922] flex justify-center">
                <div className="relative flex min-h-screen w-full max-w-[480px] flex-col items-center justify-center p-8 text-center">
                    {/* Empty State Icon */}
                    <div className="mb-8 relative">
                        <div className="absolute inset-0 bg-[#137fec]/10 blur-3xl rounded-full"></div>
                        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#137fec]/20 to-purple-500/20 dark:from-[#137fec]/30 dark:to-purple-500/30 flex items-center justify-center backdrop-blur-sm border border-[#137fec]/20">
                            <span className="material-symbols-outlined text-[#137fec] dark:text-[#4a9eff]" style={{ fontSize: '64px' }}>
                                {isNoId ? 'radio' : 'error_outline'}
                            </span>
                        </div>
                    </div>

                    {/* Error Message */}
                    <h1 className="text-[#0d141b] dark:text-white text-2xl font-bold mb-3">
                        {errorMessage}
                    </h1>
                    <p className="text-[#0d141b]/60 dark:text-slate-400 text-sm max-w-[320px] mb-8 leading-relaxed">
                        {errorDescription}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 w-full max-w-[280px]">
                        <Link
                            href="/library"
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#137fec] text-white font-medium shadow-lg shadow-[#137fec]/30 hover:scale-105 active:scale-95 transition-transform"
                        >
                            <span className="material-symbols-outlined text-xl">library_music</span>
                            <span>Go to Library</span>
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-800 text-[#0d141b] dark:text-white font-medium shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition-transform"
                        >
                            <span className="material-symbols-outlined text-xl">home</span>
                            <span>Back to Home</span>
                        </Link>
                    </div>

                    {/* iOS Indicator */}
                    <div className="absolute bottom-4 flex justify-center">
                        <div className="w-32 h-1.5 bg-black/10 dark:bg-white/10 rounded-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Calculate current time and remaining time
    const duration = audioElement?.duration || narrationData.estimated_read_time || 0;
    const currentSeconds = audioElement?.currentTime || 0;
    const currentTime = `${Math.floor(currentSeconds / 60).toString().padStart(2, "0")}:${Math.floor(currentSeconds % 60).toString().padStart(2, "0")}`;
    const remainingSeconds = duration - currentSeconds;
    const remainingTime = `${Math.floor(remainingSeconds / 60).toString().padStart(2, "0")}:${Math.floor(remainingSeconds % 60).toString().padStart(2, "0")}`;

    return (
        <div className="min-h-screen w-full bg-[#f6f7f8] dark:bg-[#101922] flex justify-center">
            <div className="relative flex min-h-screen w-full max-w-[480px] flex-col overflow-hidden shadow-2xl bg-[#f6f7f8] dark:bg-[#101922]">
                {/* Toast Notification */}
                {showToast && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
                        <div className="bg-white dark:bg-slate-800 shadow-lg rounded-full px-6 py-3 flex items-center gap-3 border border-green-500/20">
                            <div className="flex items-center justify-center size-6 rounded-full bg-green-500/10">
                                <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                            </div>
                            <p className="text-sm font-medium text-[#0d141b] dark:text-white">{toastMessage}</p>
                        </div>
                    </div>
                )}

                {/* Top Navigation */}
                <div className="flex items-center p-6 pb-2 justify-between">
                    <Link
                        href="/library"
                        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                    >
                        <span className="material-symbols-outlined text-[#0d141b] dark:text-white">expand_more</span>
                    </Link>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#0d141b]/60 dark:text-white/60">Now Playing</h2>
                    <button
                        className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                        onClick={handleShare}
                    >
                        <span className="material-symbols-outlined text-[#0d141b] dark:text-white">share</span>
                    </button>
                </div>

                {/* Album Art Section */}
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                    <div className="w-full aspect-square max-w-[320px] relative group">
                        <div className="absolute inset-0 bg-[#137fec]/20 rounded-xl blur-2xl group-hover:blur-3xl transition-all opacity-50"></div>
                        <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl bg-gradient-to-br from-[#137fec] via-purple-500 to-pink-500 flex items-center justify-center">
                            <div
                                className="w-full h-full bg-center bg-no-repeat bg-cover opacity-90 mix-blend-overlay"
                                style={{
                                    backgroundImage: `url("${narrationData.background_cover}")`,
                                }}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                                <span className="material-symbols-outlined text-6xl mb-4 opacity-80">graphic_eq</span>
                                <div className="text-center">
                                    <div className="text-xs font-bold tracking-[0.2em] uppercase opacity-70 mb-1">AI Generated</div>
                                    <div className="text-3xl font-bold leading-none">THE DEEP DIVE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Title & Metadata */}
                <div className="px-8 text-center mb-8">
                    <h1 className="text-[#0d141b] dark:text-white text-3xl font-bold tracking-tight mb-2">{narrationData.title}</h1>
                    <p className="text-[#0d141b]/60 dark:text-slate-400 text-sm font-medium">
                        {narrationData.source_url ? (
                            <a
                                href={narrationData.source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#137fec] transition-colors"
                            >
                                Source: {new URL(narrationData.source_url).hostname}
                            </a>
                        ) : (
                            `${narrationData.estimated_read_time_formatted} read`
                        )}
                    </p>
                </div>

                {/* Waveform Visualizer */}
                <div className="px-8 mb-6">
                    <div className="flex items-end justify-center gap-1 h-16 w-full opacity-80">
                        {waveformHeights.map((height, index) => (
                            <div
                                key={index}
                                className="w-1 bg-[#137fec] rounded-full transition-all duration-300"
                                style={{
                                    height: `${height * 4}px`,
                                    opacity: 0.3 + (height / 16) * 0.7,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="px-8 mb-8">
                    <div className="flex flex-col gap-2">
                        <div
                            className="h-1.5 w-full rounded-full bg-[#cfdbe7] dark:bg-slate-700 relative overflow-hidden cursor-pointer"
                            onClick={handleProgressClick}
                        >
                            <div
                                className="absolute left-0 top-0 h-full bg-[#137fec] rounded-full transition-all duration-150"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#0d141b]/60 dark:text-slate-400 text-xs font-medium">{currentTime}</p>
                            <p className="text-[#0d141b]/60 dark:text-slate-400 text-xs font-medium">{remainingTime}</p>
                        </div>
                    </div>
                </div>

                {/* Playback Controls */}
                <div className="px-8 pb-12">
                    <div className="flex items-center justify-between max-w-[280px] mx-auto mb-10">
                        <button
                            className="flex items-center justify-center size-12 text-[#0d141b] dark:text-white opacity-80 hover:opacity-100 transition-opacity active:scale-95"
                            onClick={() => {
                                if (audioElement) {
                                    audioElement.currentTime = Math.max(0, audioElement.currentTime - 10);
                                }
                            }}
                        >
                            <span className="material-symbols-outlined text-3xl">replay_10</span>
                        </button>
                        <button
                            className="flex items-center justify-center size-20 rounded-full bg-[#137fec] text-white shadow-xl shadow-[#137fec]/30 hover:scale-105 active:scale-95 transition-transform"
                            onClick={togglePlayback}
                        >
                            <span className="material-symbols-outlined text-5xl filled">
                                {isPlaying ? "pause" : "play_arrow"}
                            </span>
                        </button>
                        <button
                            className="flex items-center justify-center size-12 text-[#0d141b] dark:text-white opacity-80 hover:opacity-100 transition-opacity active:scale-95"
                            onClick={() => {
                                if (audioElement) {
                                    audioElement.currentTime = Math.min(audioElement.duration, audioElement.currentTime + 10);
                                }
                            }}
                        >
                            <span className="material-symbols-outlined text-3xl">forward_10</span>
                        </button>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between">
                        <button
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-105 active:scale-95 transition-transform"
                            onClick={cycleSpeed}
                        >
                            <span className="material-symbols-outlined text-[#137fec] text-xl">speed</span>
                            <span className="text-sm font-bold text-[#0d141b] dark:text-white">{playbackSpeed}x</span>
                        </button>
                        <div className="flex gap-4">
                            <button
                                className={`flex items-center justify-center size-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border ${isLiked ? 'border-red-100 dark:border-red-900/30 text-red-500' : 'border-slate-100 dark:border-slate-700 text-[#0d141b] dark:text-white'} hover:scale-105 active:scale-95 transition-transform`}
                                onClick={toggleLike}
                            >
                                <span className={`material-symbols-outlined text-xl ${isLiked ? 'filled' : ''}`}>favorite</span>
                            </button>
                            <button
                                className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-[#0d141b] dark:text-white hover:scale-105 active:scale-95 transition-transform"
                                onClick={handleMinimize}
                            >
                                <span className="material-symbols-outlined text-xl">subtitles</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* iOS Indicator */}
                <div className="flex justify-center pb-2">
                    <div className="w-32 h-1.5 bg-black/10 dark:bg-white/10 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}

function PlayerLoading() {
    return (
        <div className="min-h-screen w-full bg-[#f6f7f8] dark:bg-[#101922] flex justify-center items-center">
            <div className="animate-pulse text-[#0d141b] dark:text-white">Loading...</div>
        </div>
    );
}

export default function PlayerPage() {
    return (
        <Suspense fallback={<PlayerLoading />}>
            <PlayerContent />
        </Suspense>
    );
}
