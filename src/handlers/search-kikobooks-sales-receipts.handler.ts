import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function searchKikoBooksSalesReceipts(params: {
    customer_id?: number;
    status?: string;
    paymentMethodCode?: string;
    dateFrom?: string;
    dateTo?: string;
    searchTerm?: string;
    page?: number;
    pageSize?: number;
}): Promise<ToolResponse<any>> {
    try {
        const response = await kikoBooksClient.get("/api/SalesReceipts", {
            customer_id: params.customer_id,
            status: params.status,
            paymentMethodCode: params.paymentMethodCode,
            dateFrom: params.dateFrom,
            dateTo: params.dateTo,
            searchTerm: params.searchTerm,
            page: params.page,
            pageSize: params.pageSize,
        });

        return { result: response, isError: false, error: null };
    } catch (error) {
        return { result: null, isError: true, error: formatError(error) };
    }
}
