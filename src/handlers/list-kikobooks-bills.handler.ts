import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function listKikoBooksBills(params: {
    search?: string;
    status?: string;
    vendorId?: number;
    dateFrom?: string;
    dateTo?: string;
    overdue?: boolean;
    page?: number;
    pageSize?: number;
}): Promise<ToolResponse<any>> {
    try {
        const response = await kikoBooksClient.get("/api/Bills", params);
        return { result: response, isError: false, error: null };
    } catch (error) {
        return { result: null, isError: true, error: formatError(error) };
    }
}
