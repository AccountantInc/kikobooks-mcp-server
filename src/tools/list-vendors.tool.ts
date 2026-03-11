import { z } from "zod";
import { ToolDefinition } from "../types/tool-definition.js";
import { listKikoBooksVendors } from "../handlers/list-kikobooks-vendors.handler.js";

const toolSchema = z.object({
    search: z.string().optional().describe("Search by vendor name or company"),
    page: z.number().optional().describe("Page number (default: 1)"),
    pageSize: z.number().optional().describe("Results per page (default: 50, max: 500)"),
});

const toolHandler = async (args: any) => {
    const response = await listKikoBooksVendors(args);
    if (response.isError) {
        return { content: [{ type: "text" as const, text: `Error listing vendors: ${response.error}` }] };
    }
    return {
        content: [
            { type: "text" as const, text: "Vendors:" },
            { type: "text" as const, text: JSON.stringify(response.result, null, 2) },
        ],
    };
};

export const ListVendorsTool: ToolDefinition<typeof toolSchema> = {
    name: "list_vendors",
    description: "List vendors from KikoBooks. Supports text search by name or company. Returns paginated results.",
    schema: toolSchema,
    handler: toolHandler,
};
