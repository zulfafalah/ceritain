// API Types and Interfaces
// Centralized type definitions for all API responses

// ============================================
// Common Types
// ============================================

/**
 * Standard paginated response from DRF
 */
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

/**
 * Common list query parameters
 */
export interface ListParams {
    page?: number;
    page_size?: number;
    ordering?: string;
    search?: string;
}

// ============================================
// Story Narration Types
// ============================================

/**
 * Story narration status enum
 */
export type StoryNarrationStatus =
    | "pending"
    | "processing"
    | "completed"
    | "failed";

/**
 * Story narration model
 */
export interface StoryNarration {
    id: number;
    title: string;
    content_text: string;
    narration_script: string | null;
    audio_file: string | null;
    status: StoryNarrationStatus;
    error_message: string | null;
    duration: number | null;
    created_at: string;
    updated_at: string;
}

/**
 * Response when creating a new narration
 */
export interface CreateNarrationResponse {
    success: boolean;
    message: string;
    task_id: string;
    story_narration_id: number;
    status: string;
}

/**
 * Parameters for creating narration from text
 */
export interface CreateNarrationParams {
    content_text: string;
}

/**
 * Parameters for creating narration from URL
 */
export interface CreateNarrationFromUrlParams {
    url: string;
}

/**
 * Parameters for listing story narrations
 */
export interface StoryNarrationListParams extends ListParams {
    status?: StoryNarrationStatus;
}

/**
 * Task status response (for polling)
 */
export interface TaskStatusResponse {
    task_id: string;
    status: "pending" | "started" | "success" | "failure";
    result?: unknown;
    error?: string;
}
