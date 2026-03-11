import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function searchKikoBooksPurchases(params: {
    search?: string;
    vendorId?: number;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    pageSize?: number;
    sortColumn?: string;
    sortDirection?: string;
}): Promise<ToolResponse<any>> {
    try {
        const response = await kikoBooksClient.get("/api/Expenses", {
            searchTerm: params.search,
            vendorId: params.vendorId,
            status: params.status,
            fromDate: params.dateFrom,
            toDate: params.dateTo,
            page: params.page,
            pageSize: params.pageSize,
            orderBy: params.sortColumn,
            orderDirection: params.sortDirection,
        });

        return { result: response, isError: false, error: null };
    } catch (error) {
        return { result: null, isError: true, error: formatError(error) };
    }
}
