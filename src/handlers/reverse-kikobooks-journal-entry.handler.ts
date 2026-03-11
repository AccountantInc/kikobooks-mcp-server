import { kikoBooksClient } from "../clients/kikobooks-client.js";
import { ToolResponse } from "../types/tool-response.js";
import { formatError } from "../helpers/format-error.js";

export async function reverseKikoBooksJournalEntry(
    entryId: number,
    reversalDate?: string
): Promise<ToolResponse<any>> {
    try {
        const body: any = {};
        if (reversalDate) body.reversalDate = reversalDate;

        const response = await kikoBooksClient.post(
            `/api/GeneralLedger/journal-entries/${entryId}/reverse`,
            body
        );
        return { result: response, isError: false, error: null };
    } catch (error) {
        return { result: null, isError: true, error: formatError(error) };
    }
}
