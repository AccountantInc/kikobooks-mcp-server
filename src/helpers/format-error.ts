export function formatError(error: unknown): string {
    if (error instanceof Error) {
        // Handle HTTP response errors
        if ("status" in error) {
            const status = (error as any).status;
            switch (status) {
                case 401:
                    return "Authentication failed. Check your KIKOBOOKS_API_KEY or access token.";
                case 403:
                    return "You don't have permission to perform this action.";
                case 404:
                    return "Resource not found.";
                case 429:
                    return "Too many requests. Please wait before trying again.";
                default:
                    return `HTTP ${status}: ${error.message}`;
            }
        }
        return error.message;
    }

    if (typeof error === "string") {
        return error;
    }

    return JSON.stringify(error);
}
