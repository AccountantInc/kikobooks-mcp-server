import { z } from "zod";
import { ToolDefinition } from "../types/tool-definition.js";
import { getKikoBooksVendorPayment } from "../handlers/get-kikobooks-vendor-payment.handler.js";

const toolSchema = z.object({
    payment_id: z.number().describe("The vendor payment ID to retrieve"),
});

const toolHandler = async (args: any) => {
    const response = await getKikoBooksVendorPayment(args.payment_id);

    if (response.isError) {
        return {
            content: [{ type: "text" as const, text: `Error getting vendor payment: ${response.error}` }],
        };
    }

    return {
        content: [
            { type: "text" as const, text: "Vendor Payment details:" },
            { type: "text" as const, text: JSON.stringify(response.result, null, 2) },
        ],
    };
};

export const GetVendorPaymentTool: ToolDefinition<typeof toolSchema> = {
    name: "get_vendor_payment",
    description:
        "Get a vendor payment (AP) by ID from KikoBooks. Returns full payment details including bill applications.",
    schema: toolSchema,
    handler: toolHandler,
};
