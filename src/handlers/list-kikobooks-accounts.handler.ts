import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function listKikoBooksAccounts(params: {
    search?: string;
    category?: string;
    type?: string;
    page?: number;
    pageSize?: number;
}): Promise<ToolResponse<any>> {
    try {
        const response = await kikoBooksClient.get("/api/GL/Accounts", {
            search: params.search,
            category: params.category,
            type: params.type,
            page: params.page,
            pageSize: params.pageSize,
        });

        return {
            result: response,
            isError: false,
            error: null,
        };
    } catch (error) {
        return {
            result: null,
            isError: true,
            error: formatError(error),
        };
    }
}
