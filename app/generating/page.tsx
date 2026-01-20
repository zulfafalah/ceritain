"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GeneratingPage() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("Initializing...");

    // Simulated progress
    useEffect(() => {
        const statusMessages = [
            "Initializing...",
            "Analyzing content...",
            "Mixing the beats...",
            "Adding voice effects...",
            "Finalizing podcast...",
        ];

        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + Math.random() * 8 + 2;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    // Redirect to library when done
                    setTimeout(() => {
                        router.push("/library");
                    }, 500);
                    return 100;
                }
                // Update status text based on progress
                const statusIndex = Math.min(
                    Math.floor(newProgress / 20),
                    statusMessages.length - 1
                );
                setStatusText(statusMessages[statusIndex]);
                return newProgress;
            });
        }, 400);

        return () => clearInterval(interval);
    }, [router]);

    const remainingSeconds = Math.max(0, Math.ceil((100 - progress) * 0.15));

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="relative flex h-screen w-full flex-col overflow-hidden pastel-gradient bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100">
            {/* Top Navigation */}
            <div className="flex items-center p-4 pb-2 justify-between">
                <div
                    onClick={handleCancel}
                    className="size-12 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined text-2xl">
                        arrow_back_ios_new
                    </span>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
                    Generating Vibes
                </h2>
            </div>

            <div className="flex flex-col flex-1 items-center justify-center px-6">
                {/* Hero Animation */}
                <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center mb-12">
                    {/* Outer Pulse Circles */}
                    <div className="absolute inset-0 border-4 border-[#137fec]/10 rounded-full animate-pulse"></div>
                    <div
                        className="absolute inset-8 border-4 border-[#137fec]/20 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                        className="absolute inset-16 border-4 border-[#137fec]/30 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                    ></div>

                    {/* Central Character/Icon Container */}
                    <div className="relative z-10 bg-white dark:bg-slate-800 size-48 rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
                        <div className="flex items-end gap-1.5 h-16">
                            {/* Animated Waveform */}
                            <div
                                className="w-2 bg-[#137fec] rounded-full animate-bounce"
                                style={{ height: "32px", animationDelay: "0ms" }}
                            ></div>
                            <div
                                className="w-2 bg-[#137fec]/60 rounded-full animate-bounce"
                                style={{ height: "56px", animationDelay: "100ms" }}
                            ></div>
                            <div
                                className="w-2 bg-[#137fec] rounded-full animate-bounce"
                                style={{ height: "40px", animationDelay: "200ms" }}
                            ></div>
                            <div
                                className="w-2 bg-[#137fec]/40 rounded-full animate-bounce"
                                style={{ height: "64px", animationDelay: "300ms" }}
                            ></div>
                            <div
                                className="w-2 bg-[#137fec] rounded-full animate-bounce"
                                style={{ height: "48px", animationDelay: "400ms" }}
                            ></div>
                            <div
                                className="w-2 bg-[#137fec]/70 rounded-full animate-bounce"
                                style={{ height: "24px", animationDelay: "500ms" }}
                            ></div>
                        </div>
                        {/* Headphones Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                            <span className="material-symbols-outlined text-[160px]">
                                headphones
                            </span>
                        </div>
                    </div>
                </div>

                {/* Headlines */}
                <div className="text-center mb-8">
                    <h2 className="text-[#0d141b] dark:text-white tracking-tight text-[32px] font-bold leading-tight pb-2">
                        Brewing your podcast...
                    </h2>
                    <p className="text-[#4c739a] dark:text-slate-400 text-lg font-normal">
                        Turning those words into vibes
                    </p>
                </div>

                {/* Progress Card */}
                <div className="w-full max-w-sm bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-white/10">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-6 justify-between items-center">
                            <p className="text-[#0d141b] dark:text-white text-base font-semibold leading-normal">
                                {statusText}
                            </p>
                            <span className="bg-[#137fec]/10 text-[#137fec] px-3 py-1 rounded-full text-sm font-bold">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="h-4 w-full bg-[#cfdbe7] dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full bg-[#137fec] shadow-[0_0_15px_rgba(19,127,236,0.4)] transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex items-center gap-2 text-[#4c739a] dark:text-slate-400">
                            <span className="material-symbols-outlined text-sm">
                                schedule
                            </span>
                            <p className="text-sm font-medium">
                                Est. {remainingSeconds} seconds remaining
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Action */}
            <div className="p-8 pb-12 flex justify-center">
                <button
                    onClick={handleCancel}
                    className="flex items-center justify-center gap-2 px-8 py-3 rounded-full text-[#4c739a] dark:text-slate-400 font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                    Cancel Generation
                </button>
            </div>

            {/* Decorative Floating Elements */}
            <div className="absolute top-20 left-10 opacity-20 dark:opacity-10 pointer-events-none animate-pulse">
                <span className="material-symbols-outlined text-6xl text-[#137fec]">
                    auto_awesome
                </span>
            </div>
            <div className="absolute bottom-40 right-10 opacity-20 dark:opacity-10 pointer-events-none animate-pulse">
                <span className="material-symbols-outlined text-7xl text-[#137fec]">
                    music_note
                </span>
            </div>
        </div>
    );
}
