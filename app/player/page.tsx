"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Podcast data - in a real app, this would come from an API
const podcastData: Record<string, {
    title: string;
    source: string;
    image: string;
    duration: string;
}> = {
    "1": {
        title: "The Future of AI",
        source: "Tech Trends Article",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASXQ0A_d2mJX-AV5VGiaAauguL9perBvjqHZe33Th2h-XxhgSoTpnt50z1E82r2kRopnk_wWcqJ9J_ZsZX_iTijmsKA6ZvX08o3nNFJzmh2tdFhmU8D-KORe7vpEN2k344tcY9VKWaclmHrrbJy-9gvPL1hfzg6wluFOMUTZc_z9De7IX0N0JAxbncToUcJwclMUdmMc-NCNjCxl_lSrHeymeZmA0NxhFptcZkVytoqwH_-wYpSDwkL20d7wHF_hTjbLedh6GVbQ",
        duration: "12:05",
    },
    "2": {
        title: "Mindfulness Hacks for Gen Z",
        source: "Wellness Blog",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhffgmtTFcSyxqOWxS9NpVZIx2fW5m1ee2HxMITp2OUKF-vIpghLC1csAbxdSonw-nQ8PYNHpt-4rFQbyg4GUihTk4rnt-A8QSWfNLhjZ_aUNG63WWeA8qf6JtKq-ynU0uf7u9eSmGeqghgjlMS1Pvb55isr-VipwKoPCIPa-06IPUQAoFS1QKl9m8FjyljvqsTirQNjGIW5B21iDIipbKIUb4OucX4T8xPnqqNbQd-bNa0V0rBBycrJWdezROrwKvUDgmIXzl3g",
        duration: "08:42",
    },
    "3": {
        title: "Sustainable Fashion FAQ",
        source: "Fashion Magazine",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASXQ0A_d2mJX-AV5VGiaAauguL9perBvjqHZe33Th2h-XxhgSoTpnt50z1E82r2kRopnk_wWcqJ9J_ZsZX_iTijmsKA6ZvX08o3nNFJzmh2tdFhmU8D-KORe7vpEN2k344tcY9VKWaclmHrrbJy-9gvPL1hfzg6wluFOMUTZc_z9De7IX0N0JAxbncToUcJwclMUdmMc-NCNjCxl_lSrHeymeZmA0NxhFptcZkVytoqwH_-wYpSDwkL20d7wHF_hTjbLedh6GVbQ",
        duration: "15:20",
    },
    "4": {
        title: "The Rise of Remote Work",
        source: "Business Weekly",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhffgmtTFcSyxqOWxS9NpVZIx2fW5m1ee2HxMITp2OUKF-vIpghLC1csAbxdSonw-nQ8PYNHpt-4rFQbyg4GUihTk4rnt-A8QSWfNLhjZ_aUNG63WWeA8qf6JtKq-ynU0uf7u9eSmGeqghgjlMS1Pvb55isr-VipwKoPCIPa-06IPUQAoFS1QKl9m8FjyljvqsTirQNjGIW5B21iDIipbKIUb4OucX4T8xPnqqNbQd-bNa0V0rBBycrJWdezROrwKvUDgmIXzl3g",
        duration: "21:30",
    },
};

export default function PlayerPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const podcastId = searchParams.get("id") || "1";

    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(35);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.5);
    const [waveformHeights, setWaveformHeights] = useState<number[]>([]);

    const podcast = podcastData[podcastId] || podcastData["1"];

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

    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
    };

    const cycleSpeed = () => {
        const speeds = [1, 1.25, 1.5, 1.75, 2];
        const currentIndex = speeds.indexOf(playbackSpeed);
        const nextIndex = (currentIndex + 1) % speeds.length;
        setPlaybackSpeed(speeds[nextIndex]);
    };

    // Calculate current time based on progress
    const totalSeconds = parseInt(podcast.duration.split(":")[0]) * 60 + parseInt(podcast.duration.split(":")[1]);
    const currentSeconds = Math.floor((progress / 100) * totalSeconds);
    const currentTime = `${Math.floor(currentSeconds / 60).toString().padStart(2, "0")}:${(currentSeconds % 60).toString().padStart(2, "0")}`;
    const remainingSeconds = totalSeconds - currentSeconds;
    const remainingTime = `${Math.floor(remainingSeconds / 60).toString().padStart(2, "0")}:${(remainingSeconds % 60).toString().padStart(2, "0")}`;

    return (
        <div className="relative flex min-h-screen w-full flex-col max-w-[430px] mx-auto overflow-hidden shadow-2xl bg-[#f6f7f8] dark:bg-[#101922]">
            {/* Top Navigation */}
            <div className="flex items-center p-6 pb-2 justify-between">
                <Link
                    href="/library"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                >
                    <span className="material-symbols-outlined text-[#0d141b] dark:text-white">expand_more</span>
                </Link>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#0d141b]/60 dark:text-white/60">Now Playing</h2>
                <button className="flex size-12 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm cursor-pointer hover:scale-105 transition-transform">
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
                                backgroundImage: `url("${podcast.image}")`,
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
                <h1 className="text-[#0d141b] dark:text-white text-3xl font-bold tracking-tight mb-2">{podcast.title}</h1>
                <p className="text-[#0d141b]/60 dark:text-slate-400 text-sm font-medium">Source: {podcast.source}</p>
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
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const newProgress = (x / rect.width) * 100;
                            setProgress(Math.max(0, Math.min(100, newProgress)));
                        }}
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
                        onClick={() => setProgress(Math.max(0, progress - 10))}
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
                        onClick={() => setProgress(Math.min(100, progress + 10))}
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
                        <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-[#0d141b] dark:text-white hover:scale-105 active:scale-95 transition-transform">
                            <span className="material-symbols-outlined text-xl">playlist_add</span>
                        </button>
                        <button className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-[#0d141b] dark:text-white hover:scale-105 active:scale-95 transition-transform">
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
    );
}
