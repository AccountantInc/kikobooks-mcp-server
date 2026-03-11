import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function getKikoBooksVendor(vendorId: number): Promise<ToolResponse<any>> {
    try {
        const response = await kikoBooksClient.get(`/api/Vendors/${vendorId}`);
        return { result: response, isError: false, error: null };
    } catch (error) {
        return { result: null, isError: true, error: formatError(error) };
    }
}
