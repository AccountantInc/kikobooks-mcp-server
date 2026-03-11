import { z } from "zod";
import { ToolDefinition } from "../types/tool-definition.js";
import { listKikoBooksSalesReceipts } from "../handlers/list-kikobooks-sales-receipts.handler.js";

const toolSchema = z.object({
    customer_id: z.number().optional().describe("Filter by customer ID"),
    status: z.string().optional().describe("Filter by status (e.g., 'Draft', 'Posted')"),
    paymentMethodCode: z.string().optional().describe("Filter by payment method code"),
    dateFrom: z.string().optional().describe("Filter from this date (YYYY-MM-DD)"),
    dateTo: z.string().optional().describe("Filter to this date (YYYY-MM-DD)"),
    searchTerm: z.string().optional().describe("Search by receipt number or description"),
    page: z.number().optional().describe("Page number (default: 1)"),
    pageSize: z.number().optional().describe("Number of results per page (default: 50)"),
});

const toolHandler = async (args: any) => {
    const response = await listKikoBooksSalesReceipts(args);

    if (response.isError) {
        return {
            content: [{ type: "text" as const, text: `Error listing sales receipts: ${response.error}` }],
        };
    }

    return {
        content: [
            { type: "text" as const, text: "Sales Receipts:" },
            { type: "text" as const, text: JSON.stringify(response.result, null, 2) },
        ],
    };
};

export const ListSalesReceiptsTool: ToolDefinition<typeof toolSchema> = {
    name: "list_sales_receipts",
    description:
        "List sales receipts from KikoBooks. Sales receipts record instant payments (no invoice needed). Supports filtering by customer, status, payment method, and date range.",
    schema: toolSchema,
    handler: toolHandler,
};
