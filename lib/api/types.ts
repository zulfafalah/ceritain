// API Types and Interfaces
// Centralized type definitions for all API responses

// ============================================
// Story Narration Types
// ============================================

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
 * Trending story item
 */
export interface TrendingStory {
    id: number;
    status: string;
    title: string;
    content_text_preview: string;
    source_url: string;
    created_at: string;
    updated_at: string;
    total_token: number;
    result_file: string;
    created_by: string;
    play_count: number;
    estimated_read_time_formatted: string;
    background_cover: string;
}

/**
 * Library story narration item
 */
export interface LibraryStoryNarration {
    id: number;
    status: string;
    title: string;
    content_text_preview: string;
    source_url: string;
    created_at: string;
    updated_at: string;
    total_token: number;
    result_file: string;
    created_by: string;
    play_count: number;
    estimated_read_time: number;
    estimated_read_time_formatted: string;
    background_cover: string;
}

/**
 * Parameters for fetching library items
 */
export interface LibraryListParams {
    search?: string;
    created_by?: string;
}

/**
 * Story narration status response
 * Response from /story-narration/{id}/status endpoint
 */
export interface StoryNarrationStatusResponse {
    id: number;
    status: string;
    title: string;
    content_text: string;
    source_url: string;
    final_content: string;
    created_at: string;
    updated_at: string;
    input_token: number;
    output_token: number;
    total_token: number;
    result_file: string;
    message_response: string | null;
    estimated_read_time: number;
    estimated_read_time_formatted: string;
    play_count: number;
    background_cover: string;
}
