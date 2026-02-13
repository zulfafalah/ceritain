"use client";

import { useEffect, useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import {
    useFingerprint,
    generateGradientFromHash,
    generateNameFromHash,
    generateColorFromHash,
} from "@/lib/useFingerprint";

function getBrowserInfo(): { browser: string; os: string; device: string } {
    if (typeof window === "undefined") {
        return { browser: "Unknown", os: "Unknown", device: "Unknown" };
    }

    const ua = navigator.userAgent;
    let browser = "Unknown";
    let os = "Unknown";
    let device = "Desktop";

    // Detect browser
    if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Edg")) browser = "Edge";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Safari")) browser = "Safari";

    // Detect OS
    if (ua.includes("Windows")) os = "Windows";
    else if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

    // Detect device
    if (ua.includes("Mobile") || ua.includes("Android")) device = "Mobile";
    else if (ua.includes("Tablet") || ua.includes("iPad")) device = "Tablet";

    return { browser, os, device };
}

export default function ProfileV2Page() {
    const { fingerprint, isLoading, error } = useFingerprint();
    const [browserInfo, setBrowserInfo] = useState({ browser: "", os: "", device: "" });

    useEffect(() => {
        setBrowserInfo(getBrowserInfo());
    }, []);

    return (
        <div className="min-h-screen w-full bg-[#f6f7f8] dark:bg-[#101922] flex justify-center">
            <div className="relative flex min-h-screen w-full max-w-[480px] flex-col overflow-x-hidden pastel-bg-1 pastel-gradient bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100 transition-colors duration-300">
                <div className="absolute inset-0 pastel-bg-2 pointer-events-none"></div>

                {/* Main Content */}
                <main className="relative z-10 flex flex-1 flex-col px-6 pt-16 pb-28">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center mb-10">
                        {/* Avatar - Generated from fingerprint */}
                        <div className="relative mb-4">
                            {isLoading ? (
                                <div className="w-32 h-32 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
                            ) : fingerprint ? (
                                <div
                                    className="w-32 h-32 rounded-full shadow-xl flex items-center justify-center"
                                    style={{
                                        background: generateGradientFromHash(fingerprint.visitorId),
                                        boxShadow: `0 0 0 8px white, 0 10px 40px ${generateColorFromHash(fingerprint.visitorId)}40`,
                                    }}
                                >
                                    <span className="text-white text-4xl font-bold drop-shadow-lg">
                                        {fingerprint.shortId.slice(0, 2)}
                                    </span>
                                </div>
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-slate-500">
                                        person_off
                                    </span>
                                </div>
                            )}

                            {/* Status indicator */}
                            <div
                                className="absolute bottom-1 right-1 w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
                                style={{
                                    backgroundColor: fingerprint ? "#22c55e" : "#ef4444",
                                    border: "4px solid white",
                                }}
                            >
                                <span className="material-symbols-outlined text-white text-lg">
                                    {fingerprint ? "verified" : "error"}
                                </span>
                            </div>
                        </div>

                        {/* Generated Name */}
                        <h2 className="text-2xl font-bold text-[#0d141b] dark:text-white mb-2">
                            {isLoading
                                ? "Loading..."
                                : fingerprint
                                    ? generateNameFromHash(fingerprint.visitorId)
                                    : "Anonymous"}
                        </h2>

                        {/* Fingerprint ID Badge */}
                        {fingerprint && (
                            <div
                                className="px-5 py-2 rounded-full flex items-center gap-2"
                                style={{
                                    background: generateGradientFromHash(fingerprint.visitorId),
                                    boxShadow: `0 10px 15px -3px ${generateColorFromHash(fingerprint.visitorId)}30`,
                                }}
                            >
                                <span className="material-symbols-outlined text-white text-lg">
                                    fingerprint
                                </span>
                                <span className="text-white text-sm font-bold tracking-wide font-mono">
                                    {fingerprint.shortId}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Identity Details */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2">
                            Your Identity
                        </h3>

                        <div className="flex flex-col gap-2">
                            {/* Fingerprint ID */}
                            <div
                                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 flex items-center gap-4"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: "#dbeafe", color: "#3b82f6" }}
                                >
                                    <span className="material-symbols-outlined">fingerprint</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-[#0d141b] dark:text-white">
                                        Device ID
                                    </h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                                        {isLoading
                                            ? "Loading..."
                                            : fingerprint?.visitorId ?? "Not available"}
                                    </p>
                                </div>
                                {fingerprint && (
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(fingerprint.visitorId);
                                        }}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-slate-400 text-lg">
                                            content_copy
                                        </span>
                                    </button>
                                )}
                            </div>

                            {/* Confidence Score */}
                            <div
                                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 flex items-center gap-4"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: "#dcfce7", color: "#22c55e" }}
                                >
                                    <span className="material-symbols-outlined">verified</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-[#0d141b] dark:text-white">
                                        Confidence Score
                                    </h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                        {isLoading
                                            ? "Calculating..."
                                            : fingerprint
                                                ? `${(fingerprint.confidence * 100).toFixed(1)}%`
                                                : "N/A"}
                                    </p>
                                </div>
                                <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500"
                                        style={{
                                            width: fingerprint
                                                ? `${fingerprint.confidence * 100}%`
                                                : "0%",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Browser Info */}
                            <div
                                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 flex items-center gap-4"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: "#fef3c7", color: "#f59e0b" }}
                                >
                                    <span className="material-symbols-outlined">language</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-[#0d141b] dark:text-white">
                                        Browser
                                    </h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                        {browserInfo.browser} on {browserInfo.os}
                                    </p>
                                </div>
                            </div>

                            {/* Device Type */}
                            <div
                                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 flex items-center gap-4"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: "#f3e8ff", color: "#a855f7" }}
                                >
                                    <span className="material-symbols-outlined">
                                        {browserInfo.device === "Mobile"
                                            ? "smartphone"
                                            : browserInfo.device === "Tablet"
                                                ? "tablet"
                                                : "computer"}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-[#0d141b] dark:text-white">
                                        Device Type
                                    </h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                        {browserInfo.device}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="mt-8 p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50">
                        <div className="flex gap-3">
                            <span
                                className="material-symbols-outlined text-blue-500"
                                style={{ fontSize: "20px" }}
                            >
                                info
                            </span>
                            <div>
                                <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-1">
                                    How does this work?
                                </h4>
                                <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                                    Your identity is created from browser fingerprint - a unique combination of
                                    your browser and device characteristics. No login required!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="mt-4 p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50">
                            <div className="flex gap-3">
                                <span className="material-symbols-outlined text-red-500">error</span>
                                <p className="text-xs text-red-600 dark:text-red-400">
                                    {error.message}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Version */}
                    <p className="text-center text-[10px] text-slate-400 dark:text-slate-600 mt-10">
                        v1.0.0
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
