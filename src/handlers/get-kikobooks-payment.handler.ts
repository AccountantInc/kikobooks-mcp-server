import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function getKikoBooksPayment(
    paymentId: number
): Promise<ToolResponse<any>> {
    try {
        const response = await kikoBooksClient.get(`/api/Payments/${paymentId}`);
        return { result: response, isError: false, error: null };
    } catch (error) {
        return { result: null, isError: true, error: formatError(error) };
    }
}
