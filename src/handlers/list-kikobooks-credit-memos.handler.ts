import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function listKikoBooksCreditMemos(params: {
    customer_id?: number;
    status?: string;
    reasonCode?: string;
    fromDate?: string;
    toDate?: string;
    minAmount?: number;
    maxAmount?: number;
    hasRemainingBalance?: boolean;
    invoiceId?: number;
    search?: string;
    page?: number;
    pageSize?: number;
}): Promise<ToolResponse<any>> {
    try {
        const response = await kikoBooksClient.get("/api/CreditMemos", {
            customer_id: params.customer_id,
            status: params.status,
            reasonCode: params.reasonCode,
            fromDate: params.fromDate,
            toDate: params.toDate,
            minAmount: params.minAmount,
            maxAmount: params.maxAmount,
            hasRemainingBalance: params.hasRemainingBalance,
            invoiceId: params.invoiceId,
            search: params.search,
            page: params.page,
            pageSize: params.pageSize,
        });

        return { result: response, isError: false, error: null };
    } catch (error) {
        return { result: null, isError: true, error: formatError(error) };
    }
}
