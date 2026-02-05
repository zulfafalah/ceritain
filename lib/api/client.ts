// Base API Client with interceptor pattern
// Centralized HTTP client for all API calls

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Custom API Error class for better error handling
export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public data?: unknown
    ) {
        super(message);
        this.name = "ApiError";
    }
}

// Extended request config with query params support
interface RequestConfig extends Omit<RequestInit, "body"> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params?: Record<string, any>;
}

// Handle response and parse JSON
async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new ApiError(
            response.status,
            errorData?.message || errorData?.detail || `Request failed with status ${response.status}`,
            errorData
        );
    }
    return response.json();
}

// Build URL with query parameters
function buildUrl(baseUrl: string, endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(`${baseUrl}${endpoint}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined) {
                url.searchParams.append(key, String(value));
            }
        });
    }
    return url.toString();
}

// Default headers for all requests
function getDefaultHeaders(): HeadersInit {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
    };
}

/**
 * Centralized API client with common methods
 * Handles base URL, headers, and error handling
 */
export const apiClient = {
    baseUrl: API_BASE_URL,

    /**
     * GET request
     */
    async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        const url = buildUrl(this.baseUrl, endpoint, config?.params);
        const response = await fetch(url, {
            method: "GET",
            headers: { ...getDefaultHeaders(), ...config?.headers },
            ...config,
        });
        return handleResponse<T>(response);
    },

    /**
     * POST request
     */
    async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
        const url = buildUrl(this.baseUrl, endpoint, config?.params);
        const response = await fetch(url, {
            method: "POST",
            headers: { ...getDefaultHeaders(), ...config?.headers },
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });
        return handleResponse<T>(response);
    },

    /**
     * PUT request
     */
    async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
        const url = buildUrl(this.baseUrl, endpoint, config?.params);
        const response = await fetch(url, {
            method: "PUT",
            headers: { ...getDefaultHeaders(), ...config?.headers },
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });
        return handleResponse<T>(response);
    },

    /**
     * PATCH request
     */
    async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
        const url = buildUrl(this.baseUrl, endpoint, config?.params);
        const response = await fetch(url, {
            method: "PATCH",
            headers: { ...getDefaultHeaders(), ...config?.headers },
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });
        return handleResponse<T>(response);
    },

    /**
     * DELETE request
     */
    async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        const url = buildUrl(this.baseUrl, endpoint, config?.params);
        const response = await fetch(url, {
            method: "DELETE",
            headers: { ...getDefaultHeaders(), ...config?.headers },
            ...config,
        });
        return handleResponse<T>(response);
    },

    /**
     * Stream request for SSE (Server-Sent Events)
     * Returns raw Response for manual stream handling
     */
    async stream(endpoint: string, data?: unknown, config?: RequestConfig): Promise<Response> {
        const url = buildUrl(this.baseUrl, endpoint, config?.params);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...config?.headers,
            },
            body: data ? JSON.stringify(data) : undefined,
            ...config,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new ApiError(
                response.status,
                errorData?.message || "Stream request failed",
                errorData
            );
        }

        return response;
    },
};
