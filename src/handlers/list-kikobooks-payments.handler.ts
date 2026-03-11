import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function listKikoBooksPayments(params: {
    search?: string;
    status?: string;
    customer_id?: number;
    payment_method_code?: string;
    payment_date_from?: string;
    payment_date_to?: string;
    page?: number;
    pageSize?: number;
}): Promise<ToolResponse<any>> {
    try {
        const response = await kikoBooksClient.get("/api/Payments", {
            search: params.search,
            status: params.status,
            customer_id: params.customer_id,
            payment_method_code: params.payment_method_code,
            payment_date_from: params.payment_date_from,
            payment_date_to: params.payment_date_to,
            page: params.page,
            page_size: params.pageSize,
        });

        return { result: response, isError: false, error: null };
    } catch (error) {
        return { result: null, isError: true, error: formatError(error) };
    }
}
