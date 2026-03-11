import { z } from "zod";
import { ToolDefinition } from "../types/tool-definition.js";
import { deleteKikoBooksBillPayment } from "../handlers/delete-kikobooks-bill-payment.handler.js";

const toolSchema = z.object({
    payment_id: z.number().describe("The Bill Payment ID to delete"),
});

const toolHandler = async (args: any) => {
    const response = await deleteKikoBooksBillPayment(args.payment_id);

    if (response.isError) {
        return {
            content: [{ type: "text" as const, text: `Error deleting bill payment: ${response.error}` }],
        };
    }

    return {
        content: [
            { type: "text" as const, text: "Bill payment deleted:" },
            { type: "text" as const, text: JSON.stringify(response.result, null, 2) },
        ],
    };
};

export const DeleteBillPaymentTool: ToolDefinition<typeof toolSchema> = {
    name: "delete_bill_payment",
    description:
        "Delete a bill payment in KikoBooks.",
    schema: toolSchema,
    handler: toolHandler,
};
