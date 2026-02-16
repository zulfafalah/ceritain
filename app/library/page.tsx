"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";
import { storyNarrationApi, LibraryStoryNarration } from "@/lib/api";
import { useFingerprint } from "@/lib/useFingerprint";

export default function LibraryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [library, setLibrary] = useState<LibraryStoryNarration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { fingerprint, isLoading: fingerprintLoading } = useFingerprint();

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500); // 500ms delay

        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    // Fetch library data
    useEffect(() => {
        const fetchLibrary = async () => {
            if (fingerprintLoading || !fingerprint) {
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const data = await storyNarrationApi.getLibrary({
                    created_by: fingerprint.visitorId,
                    search: debouncedSearchQuery || undefined,
                });
                setLibrary(data);
            } catch (err) {
                console.error("Failed to fetch library:", err);
                setError("Failed to load your library. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLibrary();
    }, [fingerprint, fingerprintLoading, debouncedSearchQuery]);

    // Format duration from estimated_read_time
    const formatDuration = (item: LibraryStoryNarration) => {
        return item.estimated_read_time_formatted || `${item.estimated_read_time} Sec`;
    };

    // Get status display
    const getStatus = (item: LibraryStoryNarration): "in-progress" | "completed" => {
        return item.status === "done" ? "completed" : "in-progress";
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return "Today";
        if (diffInDays === 1) return "Yesterday";
        if (diffInDays < 7) return `${diffInDays} days ago`;
        if (diffInDays < 14) return "Last week";
        return date.toLocaleDateString();
    };

    return (
        <div className="min-h-screen w-full bg-[#f6f7f8] dark:bg-[#101922] flex justify-center">
            <div className="relative flex min-h-screen w-full max-w-[480px] flex-col overflow-x-hidden pastel-bg-1 pastel-gradient bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100 transition-colors duration-300">
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

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#137fec] mb-3"></div>
                                <p className="text-sm font-medium">Loading your library...</p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && !isLoading && (
                            <div className="flex flex-col items-center justify-center py-12 text-red-500">
                                <span className="material-symbols-outlined text-4xl mb-2">
                                    error
                                </span>
                                <p className="text-sm font-medium">{error}</p>
                            </div>
                        )}

                        {/* Library Items */}
                        {!isLoading && !error && library.map((item) => (
                            <Link
                                key={item.id}
                                href={`/player?id=${item.id}`}
                                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 flex items-center gap-4 shadow-sm group active:scale-[0.98] transition-all cursor-pointer"
                            >
                                {/* Thumbnail */}
                                <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden shadow-md">
                                    <div
                                        className="w-full h-full bg-center bg-cover"
                                        style={{
                                            backgroundImage: `url("${item.background_cover}")`,
                                        }}
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-[#0d141b] dark:text-white truncate">
                                        {item.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-400 font-medium">
                                            {formatDuration(item)}
                                        </span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        {getStatus(item) === "in-progress" ? (
                                            <span className="text-xs text-[#137fec] font-semibold">
                                                In Progress
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-400 font-medium">
                                                {formatDate(item.created_at)}
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

                        {/* Empty State */}
                        {!isLoading && !error && library.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 px-6">
                                {/* Gradient Background Circle */}
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#137fec]/20 to-purple-500/20 rounded-full blur-2xl"></div>
                                    <div className="relative bg-gradient-to-br from-[#137fec]/10 to-purple-500/10 backdrop-blur-sm p-8 rounded-full border border-white/20 dark:border-slate-700/30">
                                        <span className="material-symbols-outlined text-6xl bg-gradient-to-br from-[#137fec] to-purple-500 bg-clip-text text-transparent">
                                            {searchQuery ? "search_off" : "library_music"}
                                        </span>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <h3 className="text-[#0d141b] dark:text-white text-xl font-bold mb-2 text-center">
                                    {searchQuery ? "No podcasts found" : "Your library is empty"}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-6 max-w-xs leading-relaxed">
                                    {searchQuery
                                        ? "Try adjusting your search terms or browse your entire library"
                                        : "Start creating amazing podcasts from your favorite articles and build your audio collection"}
                                </p>

                                {/* Action Button */}
                                {!searchQuery && (
                                    <Link
                                        href="/"
                                        className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#137fec] to-purple-500 text-white rounded-full font-semibold shadow-lg shadow-[#137fec]/30 hover:shadow-xl hover:shadow-[#137fec]/40 active:scale-95 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            add_circle
                                        </span>
                                        Create Podcast
                                    </Link>
                                )}

                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="flex items-center gap-2 px-6 py-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md text-[#137fec] border border-[#137fec]/20 rounded-full font-semibold hover:bg-[#137fec]/10 active:scale-95 transition-all"
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            clear
                                        </span>
                                        Clear Search
                                    </button>
                                )}
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
