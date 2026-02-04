"use client";

import BottomNavigation from "@/components/BottomNavigation";

export default function ProfilePage() {
    return (
        <div className="min-h-screen w-full bg-[#f6f7f8] dark:bg-[#101922] flex justify-center">
            <div className="relative flex min-h-screen w-full max-w-[480px] flex-col overflow-x-hidden pastel-bg-1 pastel-gradient bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100 transition-colors duration-300">
                <div className="absolute inset-0 pastel-bg-2 pointer-events-none"></div>

                {/* Main Content */}
                <main className="relative z-10 flex flex-1 flex-col px-6 pt-16 pb-28">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center mb-10">
                        {/* Avatar */}
                        <div className="relative mb-4">
                            <div
                                className="w-32 h-32 rounded-full shadow-xl overflow-hidden bg-cover bg-center"
                                style={{
                                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbbP5xiUCAICPZWt8zJZpXfGueUROQJW4y_Z1mAeS4-cNTUQ8mMSHn67ZjXDE79lYbl8E77N9aqsbirKI432lGZgaZUaUIZp88h_3vghnbsTg6gBwSaz4WPNnMP73C46UrULWfUeiXlBcPB6C-g4uOKMRsbEkOnTkz8oyxKVaai0j9q27K3LhqSODlHVQyyS6yQo-bqpToLK2QAPeGcQNiyLkIg4iYZr64eC5425K-U1o7-W3eEUVTN4TojhQeC0DKyZU-zMjh-w")`,
                                    boxShadow: "0 0 0 8px white",
                                }}
                            ></div>
                            <button
                                className="absolute bottom-1 right-1 w-9 h-9 bg-[#137fec] text-white rounded-full flex items-center justify-center shadow-sm"
                                style={{ border: "4px solid white" }}
                            >
                                <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                        </div>

                        {/* Name */}
                        <h2 className="text-2xl font-bold text-[#0d141b] dark:text-white mb-2">
                            Alex Rivera
                        </h2>

                        {/* Credits Badge */}
                        <div
                            className="px-5 py-2 rounded-full flex items-center gap-2"
                            style={{
                                background: "linear-gradient(to right, #137fec, #50a2f5)",
                                boxShadow: "0 10px 15px -3px rgba(19, 127, 236, 0.2)",
                            }}
                        >
                            <span className="material-symbols-outlined text-white text-lg">bolt</span>
                            <span className="text-white text-sm font-bold tracking-wide">
                                15/20 Credits Left
                            </span>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2">
                            Account Settings
                        </h3>

                        <div className="flex flex-col gap-2">
                            {/* Voice Preferences */}
                            <button className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 active:scale-[0.98] transition-all group" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: "#ffedd5", color: "#f97316" }}
                                >
                                    <span className="material-symbols-outlined">graphic_eq</span>
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className="text-sm font-bold text-[#0d141b] dark:text-white">
                                        Voice Preferences
                                    </h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                        Change AI voice style & tone
                                    </p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">
                                    chevron_right
                                </span>
                            </button>

                            {/* App Theme */}
                            <button className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 active:scale-[0.98] transition-all group" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: "#f3e8ff", color: "#a855f7" }}
                                >
                                    <span className="material-symbols-outlined">palette</span>
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className="text-sm font-bold text-[#0d141b] dark:text-white">
                                        App Theme
                                    </h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                        Personalize your experience
                                    </p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">
                                    chevron_right
                                </span>
                            </button>

                            {/* Help & Support */}
                            <button className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 active:scale-[0.98] transition-all group" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: "#dcfce7", color: "#22c55e" }}
                                >
                                    <span className="material-symbols-outlined">support_agent</span>
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className="text-sm font-bold text-[#0d141b] dark:text-white">
                                        Help & Support
                                    </h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                        FAQs and community help
                                    </p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform">
                                    chevron_right
                                </span>
                            </button>

                            {/* Log Out */}
                            <button
                                className="backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 active:scale-[0.98] transition-all group mt-2 bg-red-50/50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-100 dark:bg-red-900/60"
                                    style={{ color: "#ef4444" }}
                                >
                                    <span className="material-symbols-outlined">logout</span>
                                </div>
                                <div className="flex-1 text-left">
                                    <h4 className="text-sm font-bold text-red-500">Log Out</h4>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Version */}
                    <p className="text-center text-[10px] text-slate-400 dark:text-slate-600 mt-10">
                        Version 2.4.0 (2023)
                    </p>
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
