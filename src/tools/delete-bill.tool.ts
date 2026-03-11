import { z } from "zod";
import { ToolDefinition } from "../types/tool-definition.js";
import { deleteKikoBooksBill } from "../handlers/delete-kikobooks-bill.handler.js";

const toolSchema = z.object({
    bill_id: z.number().describe("The Bill ID to delete (soft delete — sets inactive)"),
});

const toolHandler = async (args: any) => {
    const response = await deleteKikoBooksBill(args.bill_id);

    if (response.isError) {
        return {
            content: [{ type: "text" as const, text: `Error deleting bill: ${response.error}` }],
        };
    }

    return {
        content: [
            { type: "text" as const, text: "Bill deleted:" },
            { type: "text" as const, text: JSON.stringify(response.result, null, 2) },
        ],
    };
};

export const DeleteBillTool: ToolDefinition<typeof toolSchema> = {
    name: "delete_bill",
    description:
        "Delete a bill in KikoBooks. This performs a soft delete by setting the bill as inactive.",
    schema: toolSchema,
    handler: toolHandler,
};
