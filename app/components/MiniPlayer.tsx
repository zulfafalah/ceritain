"use client";

import { usePlayer } from "../context/PlayerContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MiniPlayer() {
    const {
        currentPodcastId,
        isPlaying,
        togglePlayback,
        narrationData,
        isLoading
    } = usePlayer();

    const router = useRouter();
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    // Hide if on player page or if no podcast is active
    useEffect(() => {
        if (pathname === '/player' || !currentPodcastId || !narrationData) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    }, [pathname, currentPodcastId, narrationData]);

    if (!isVisible || !narrationData) return null;

    // Pages with BottomNavigation
    const withNavPages = ['/', '/library', '/profile', '/profile-v2'];
    const hasNav = withNavPages.includes(pathname);

    // Bottom offset class
    const positionClass = hasNav ? 'bottom-[88px]' : 'bottom-0';

    const handleExpandWrapper = () => {
        router.push(`/player?id=${currentPodcastId}`);
    };

    return (
        <div className={`fixed ${positionClass} left-0 right-0 z-50 p-2 pb-safe bg-gradient-to-t from-white/90 to-white/90 dark:from-[#101922]/90 dark:to-[#101922]/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 shadow-lg transition-all duration-300`}>
            <div
                className="max-w-[480px] mx-auto flex items-center gap-3 p-2 pr-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                onClick={handleExpandWrapper}
            >
                {/* Album Art (Small) */}
                <div
                    className="relative size-10 rounded-lg overflow-hidden shrink-0 bg-slate-200 dark:bg-slate-700"
                >
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${narrationData.background_cover}")` }}
                    />
                    {/* Mini equalizer animation/icon overlay if playing? Maybe too much detail for now */}
                </div>

                {/* Text Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-[#0d141b] dark:text-white truncate">
                        {narrationData.title}
                    </h3>
                    <p className="text-xs text-[#0d141b]/60 dark:text-slate-400 truncate">
                        {narrationData.source_url ? new URL(narrationData.source_url).hostname : 'Ceritain'}
                    </p>
                </div>

                {/* Controls */}
                <button
                    className="flex items-center justify-center size-9 rounded-full bg-[#137fec] text-white shadow-md hover:scale-105 active:scale-95 transition-transform shrink-0"
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePlayback();
                    }}
                >
                    <span className="material-symbols-outlined text-xl filled">
                        {isPlaying ? "pause" : "play_arrow"}
                    </span>
                </button>
            </div>

            {/* Safe area spacer if needed, usually handled by padding-bottom on the container */}
        </div>
    );
}
