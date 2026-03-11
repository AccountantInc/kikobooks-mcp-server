import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function searchKikoBooksCustomers(params: {
    search?: string;
    page?: number;
    pageSize?: number;
    sortColumn?: string;
    sortDirection?: string;
}): Promise<ToolResponse<any>> {
    try {
        const response = await kikoBooksClient.get("/api/Customers", {
            search: params.search,
            page: params.page,
            pageSize: params.pageSize,
            sortColumn: params.sortColumn,
            sortDirection: params.sortDirection,
        });

        return { result: response, isError: false, error: null };
    } catch (error) {
        return { result: null, isError: true, error: formatError(error) };
    }
}
