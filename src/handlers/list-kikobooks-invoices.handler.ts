import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function listKikoBooksInvoices(params: {
    search?: string;
    status?: string;
    customerId?: number;
    dateFrom?: string;
    dateTo?: string;
    overdue?: boolean;
    page?: number;
    pageSize?: number;
}): Promise<ToolResponse<any>> {
    try {
        const response = await kikoBooksClient.get("/api/Invoices", {
            search: params.search,
            status: params.status,
            customerId: params.customerId,
            dateFrom: params.dateFrom,
            dateTo: params.dateTo,
            overdue: params.overdue,
            page: params.page,
            pageSize: params.pageSize,
        });
        return { result: response, isError: false, error: null };
    } catch (error) {
        return { result: null, isError: true, error: formatError(error) };
    }
}
