"use client";

import { useState, useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

interface FingerprintData {
    visitorId: string;
    shortId: string;
    confidence: number;
}

interface UseFingerprintResult {
    fingerprint: FingerprintData | null;
    isLoading: boolean;
    error: Error | null;
}

export function useFingerprint(): UseFingerprintResult {
    const [fingerprint, setFingerprint] = useState<FingerprintData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const getFingerprint = async () => {
            try {
                // Check localStorage first
                const cached = localStorage.getItem("fingerprint_data");
                if (cached) {
                    const parsedCache = JSON.parse(cached) as FingerprintData;
                    setFingerprint(parsedCache);
                    setIsLoading(false);
                    return;
                }

                // Load FingerprintJS agent
                const fp = await FingerprintJS.load();
                const result = await fp.get();

                const data: FingerprintData = {
                    visitorId: result.visitorId,
                    shortId: result.visitorId.slice(0, 8).toUpperCase(),
                    confidence: result.confidence.score,
                };

                // Cache to localStorage
                localStorage.setItem("fingerprint_data", JSON.stringify(data));

                setFingerprint(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Failed to get fingerprint"));
            } finally {
                setIsLoading(false);
            }
        };

        getFingerprint();
    }, []);

    return { fingerprint, isLoading, error };
}

// Helper: Generate a color from fingerprint hash
export function generateColorFromHash(hash: string): string {
    let hashValue = 0;
    for (let i = 0; i < hash.length; i++) {
        hashValue = hash.charCodeAt(i) + ((hashValue << 5) - hashValue);
    }
    const hue = Math.abs(hashValue % 360);
    return `hsl(${hue}, 70%, 60%)`;
}

// Helper: Generate gradient from fingerprint
export function generateGradientFromHash(hash: string): string {
    const color1 = generateColorFromHash(hash);
    const color2 = generateColorFromHash(hash.split("").reverse().join(""));
    return `linear-gradient(135deg, ${color1}, ${color2})`;
}

// Helper: Generate random name from fingerprint
const adjectives = ["Swift", "Bright", "Silent", "Bold", "Calm", "Keen", "Noble", "Quick", "Wise", "True"];
const nouns = ["Wolf", "Hawk", "Lion", "Bear", "Fox", "Owl", "Eagle", "Tiger", "Raven", "Phoenix"];

export function generateNameFromHash(hash: string): string {
    let hashValue = 0;
    for (let i = 0; i < hash.length; i++) {
        hashValue += hash.charCodeAt(i);
    }
    const adj = adjectives[hashValue % adjectives.length];
    const noun = nouns[(hashValue * 7) % nouns.length];
    return `${adj} ${noun}`;
}
