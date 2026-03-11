import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function updateKikoBooksAccount(
    accountId: number,
    accountData: any
): Promise<ToolResponse<any>> {
    try {
        const response = await kikoBooksClient.put(
            `/api/GL/Accounts/${accountId}`,
            accountData
        );

        return {
            result: response,
            isError: false,
            error: null,
        };
    } catch (error) {
        return {
            result: null,
            isError: true,
            error: formatError(error),
        };
    }
}
