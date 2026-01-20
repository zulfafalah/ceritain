"use client";

import { useState } from "react";
import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";

interface PodcastItem {
    id: number;
    title: string;
    duration: string;
    status: "in-progress" | "completed";
    date?: string;
    image: string;
    imageFilter?: string;
    opacity?: boolean;
}

const podcastLibrary: PodcastItem[] = [
    {
        id: 1,
        title: "The Future of AI",
        duration: "12:05",
        status: "in-progress",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuASXQ0A_d2mJX-AV5VGiaAauguL9perBvjqHZe33Th2h-XxhgSoTpnt50z1E82r2kRopnk_wWcqJ9J_ZsZX_iTijmsKA6ZvX08o3nNFJzmh2tdFhmU8D-KORe7vpEN2k344tcY9VKWaclmHrrbJy-9gvPL1hfzg6wluFOMUTZc_z9De7IX0N0JAxbncToUcJwclMUdmMc-NCNjCxl_lSrHeymeZmA0NxhFptcZkVytoqwH_-wYpSDwkL20d7wHF_hTjbLedh6GVbQ",
    },
    {
        id: 2,
        title: "Mindfulness Hacks for Gen Z",
        duration: "08:42",
        status: "completed",
        date: "Yesterday",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBhffgmtTFcSyxqOWxS9NpVZIx2fW5m1ee2HxMITp2OUKF-vIpghLC1csAbxdSonw-nQ8PYNHpt-4rFQbyg4GUihTk4rnt-A8QSWfNLhjZ_aUNG63WWeA8qf6JtKq-ynU0uf7u9eSmGeqghgjlMS1Pvb55isr-VipwKoPCIPa-06IPUQAoFS1QKl9m8FjyljvqsTirQNjGIW5B21iDIipbKIUb4OucX4T8xPnqqNbQd-bNa0V0rBBycrJWdezROrwKvUDgmIXzl3g",
    },
    {
        id: 3,
        title: "Sustainable Fashion FAQ",
        duration: "15:20",
        status: "completed",
        date: "2 days ago",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuASXQ0A_d2mJX-AV5VGiaAauguL9perBvjqHZe33Th2h-XxhgSoTpnt50z1E82r2kRopnk_wWcqJ9J_ZsZX_iTijmsKA6ZvX08o3nNFJzmh2tdFhmU8D-KORe7vpEN2k344tcY9VKWaclmHrrbJy-9gvPL1hfzg6wluFOMUTZc_z9De7IX0N0JAxbncToUcJwclMUdmMc-NCNjCxl_lSrHeymeZmA0NxhFptcZkVytoqwH_-wYpSDwkL20d7wHF_hTjbLedh6GVbQ",
        imageFilter: "hue-rotate(90deg)",
    },
    {
        id: 4,
        title: "The Rise of Remote Work",
        duration: "21:30",
        status: "completed",
        date: "Last week",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBhffgmtTFcSyxqOWxS9NpVZIx2fW5m1ee2HxMITp2OUKF-vIpghLC1csAbxdSonw-nQ8PYNHpt-4rFQbyg4GUihTk4rnt-A8QSWfNLhjZ_aUNG63WWeA8qf6JtKq-ynU0uf7u9eSmGeqghgjlMS1Pvb55isr-VipwKoPCIPa-06IPUQAoFS1QKl9m8FjyljvqsTirQNjGIW5B21iDIipbKIUb4OucX4T8xPnqqNbQd-bNa0V0rBBycrJWdezROrwKvUDgmIXzl3g",
        imageFilter: "saturate(0.5)",
        opacity: true,
    },
];

export default function LibraryPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPodcasts = podcastLibrary.filter((podcast) =>
        podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen w-full bg-[#f6f7f8] dark:bg-[#101922] flex justify-center">
            <div className="relative flex min-h-screen w-full max-w-[480px] flex-col overflow-x-hidden pastel-bg-1 bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100 transition-colors duration-300">
                <div className="absolute inset-0 pastel-bg-2 pointer-events-none"></div>

                {/* Header */}
                <header className="relative z-10 flex items-center justify-between px-6 pt-10 pb-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#137fec]/10 p-2 rounded-full">
                                <span className="material-symbols-outlined text-[#137fec] text-2xl">
                                    library_music
                                </span>
                            </div>
                            <h1 className="text-[#0d141b] dark:text-white text-2xl font-bold leading-tight tracking-tight">
                                Your Podcasts 🎧
                            </h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium ml-12">
                            Manage your audio creations
                        </p>
                    </div>
                    <div className="shrink-0">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-4 ring-white dark:ring-slate-800"
                            style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbbP5xiUCAICPZWt8zJZpXfGueUROQJW4y_Z1mAeS4-cNTUQ8mMSHn67ZjXDE79lYbl8E77N9aqsbirKI432lGZgaZUaUIZp88h_3vghnbsTg6gBwSaz4WPNnMP73C46UrULWfUeiXlBcPB6C-g4uOKMRsbEkOnTkz8oyxKVaai0j9q27K3LhqSODlHVQyyS6yQo-bqpToLK2QAPeGcQNiyLkIg4iYZr64eC5425K-U1o7-W3eEUVTN4TojhQeC0DKyZU-zMjh-w")`,
                            }}
                        />
                    </div>
                </header>

                {/* Main Content */}
                <main className="relative z-10 flex flex-1 flex-col px-6 pb-28">
                    {/* Search Bar */}
                    <div className="my-4">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                search
                            </span>
                            <input
                                className="w-full h-14 pl-12 pr-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-[#137fec]/20 focus:outline-none text-base transition-all"
                                placeholder="Search your library..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Library List */}
                    <div className="flex flex-col gap-4 mt-2">
                        <h3 className="text-[#0d141b] dark:text-white text-lg font-bold px-1">
                            My Library
                        </h3>

                        {filteredPodcasts.map((podcast) => (
                            <Link
                                key={podcast.id}
                                href={`/player?id=${podcast.id}`}
                                className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 flex items-center gap-4 shadow-sm group active:scale-[0.98] transition-all cursor-pointer ${podcast.opacity ? "opacity-80" : ""
                                    }`}
                            >
                                {/* Thumbnail */}
                                <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-md">
                                    <div
                                        className={`w-full h-full bg-center bg-cover ${podcast.imageFilter?.includes("hue-rotate")
                                            ? "bg-[#137fec]/20"
                                            : ""
                                            }`}
                                        style={{
                                            backgroundImage: `url("${podcast.image}")`,
                                            filter: podcast.imageFilter || undefined,
                                        }}
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-[#0d141b] dark:text-white truncate">
                                        {podcast.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-400 font-medium">
                                            {podcast.duration}
                                        </span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        {podcast.status === "in-progress" ? (
                                            <span className="text-xs text-[#137fec] font-semibold">
                                                In Progress
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-400 font-medium">
                                                {podcast.date}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Play Button */}
                                <div className="w-10 h-10 flex items-center justify-center bg-[#137fec] text-white rounded-full shadow-lg shadow-[#137fec]/20">
                                    <span className="material-symbols-outlined filled text-xl">
                                        play_arrow
                                    </span>
                                </div>
                            </Link>
                        ))}

                        {filteredPodcasts.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                                <span className="material-symbols-outlined text-4xl mb-2">
                                    search_off
                                </span>
                                <p className="text-sm font-medium">No podcasts found</p>
                            </div>
                        )}
                    </div>
                </main>

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center">
                    <div className="w-full max-w-[480px]">
                        <BottomNavigation />
                    </div>
                </div>
            </div>
        </div>
    );
}
