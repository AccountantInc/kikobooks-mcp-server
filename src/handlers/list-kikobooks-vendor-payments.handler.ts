import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function listKikoBooksVendorPayments(params: {
    vendorId?: number;
    fromDate?: string;
    toDate?: string;
    status?: string;
    paymentMethod?: string;
    search?: string;
    page?: number;
    pageSize?: number;
}): Promise<ToolResponse<any>> {
    try {
        const response = await kikoBooksClient.get("/api/VendorPayments", {
            vendorId: params.vendorId,
            fromDate: params.fromDate,
            toDate: params.toDate,
            status: params.status,
            paymentMethod: params.paymentMethod,
            search: params.search,
            page: params.page,
            pageSize: params.pageSize,
        });

        return { result: response, isError: false, error: null };
    } catch (error) {
        return { result: null, isError: true, error: formatError(error) };
    }
}
