// Story Narration API Service
// All endpoints related to story narration

import { apiClient } from "./client";
import type {
    CreateNarrationResponse,
    TrendingStory,
    LibraryStoryNarration,
    LibraryListParams,
    StoryNarrationStatusResponse,
} from "./types";

/**
 * Get browser fingerprint from localStorage
 * @returns fingerprint visitorId or empty string if not found
 */
function getBrowserFingerprint(): string {
    if (typeof window === "undefined") return "";
    const cached = localStorage.getItem("fingerprint_data");
    if (!cached) return "";
    try {
        const data = JSON.parse(cached);
        return data.visitorId || "";
    } catch {
        return "";
    }
}

/**
 * Story Narration API endpoints
 * Provides methods for CRUD operations on story narrations
 */
export const storyNarrationApi = {
    /**
     * Create story narration from text content
     * @param content_text - The text content to narrate
     */
    create(content_text: string): Promise<CreateNarrationResponse> {
        const fingerprint = getBrowserFingerprint();
        const formData = new URLSearchParams();
        formData.append("content_text", content_text);
        formData.append("source_url", "");

        return apiClient.post<CreateNarrationResponse>(
            "/api/v1/ceritain/story-narration/create",
            formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Client-Fingerprint": fingerprint,
                },
            }
        );
    },

    /**
     * Create story narration from URL
     * @param source_url - The URL to fetch content from
     */
    createFromUrl(source_url: string): Promise<CreateNarrationResponse> {
        const fingerprint = getBrowserFingerprint();
        const formData = new URLSearchParams();
        formData.append("content_text", "");
        formData.append("source_url", source_url);

        return apiClient.post<CreateNarrationResponse>(
            "/api/v1/ceritain/story-narration/create",
            formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Client-Fingerprint": fingerprint,
                },
            }
        );
    },

    /**
     * Get story narration status with full details
     * @param id - The story narration ID
     * @returns Full status response including audio file and metadata
     */
    getStatus(id: number): Promise<StoryNarrationStatusResponse> {
        return apiClient.get<StoryNarrationStatusResponse>(`/api/v1/ceritain/story-narration/${id}/status`);
    },

    /**
     * Get trending story narrations
     * @returns Array of trending stories
     */
    getTrending(): Promise<TrendingStory[]> {
        return apiClient.get<TrendingStory[]>("/api/v1/ceritain/story-narration/trending");
    },

    /**
     * Get user's library of story narrations
     * @param params - Optional search and filter parameters
     * @returns Array of library story narrations
     */
    getLibrary(params?: LibraryListParams): Promise<LibraryStoryNarration[]> {
        return apiClient.get<LibraryStoryNarration[]>("/api/v1/ceritain/story-narration/", { params });
    },

    /**
     * Get streaming URL for audio playback
     * @param id - The story narration ID
     * @returns Full URL to streaming endpoint
     */
    getStreamingUrl(id: number): string {
        return `${apiClient.baseUrl}/api/v1/ceritain/story-narration/${id}/streaming`;
    },
};

// Re-export ApiError for convenience
export { ApiError } from "./client";
