// Story Narration API Service
// All endpoints related to story narration

import { apiClient } from "./client";
import type {
    CreateNarrationResponse,
    StoryNarration,
    StoryNarrationListParams,
    PaginatedResponse,
    TaskStatusResponse,
} from "./types";

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
        return apiClient.post<CreateNarrationResponse>(
            "/story-narration/create",
            { content_text }
        );
    },

    /**
     * Create story narration from URL
     * @param url - The URL to fetch content from
     */
    createFromUrl(url: string): Promise<CreateNarrationResponse> {
        return apiClient.post<CreateNarrationResponse>(
            "/story-narration/create-from-url/",
            { url }
        );
    },

    /**
     * Get list of story narrations with pagination and filtering
     * @param params - Optional filter and pagination parameters
     */
    list(params?: StoryNarrationListParams): Promise<PaginatedResponse<StoryNarration>> {
        return apiClient.get<PaginatedResponse<StoryNarration>>(
            "/story-narration/",
            { params }
        );
    },

    /**
     * Get a single story narration by ID
     * @param id - The story narration ID
     */
    getById(id: number): Promise<StoryNarration> {
        return apiClient.get<StoryNarration>(`/story-narration/${id}/`);
    },

    /**
     * Get task status for a story narration
     * @param taskId - The celery task ID
     */
    getTaskStatus(taskId: string): Promise<TaskStatusResponse> {
        return apiClient.get<TaskStatusResponse>(`/task-status/${taskId}/`);
    },

    /**
     * Stream audio for a story narration (SSE)
     * @param id - The story narration ID
     */
    stream(id: number): Promise<Response> {
        return apiClient.stream(`/story-narration/${id}/stream/`);
    },

    /**
     * Delete a story narration
     * @param id - The story narration ID
     */
    delete(id: number): Promise<void> {
        return apiClient.delete<void>(`/story-narration/${id}/`);
    },
};

// Re-export ApiError for convenience
export { ApiError } from "./client";
