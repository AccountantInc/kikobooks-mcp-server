import { z } from "zod";
import { ToolDefinition } from "../types/tool-definition.js";
import { listKikoBooksItems } from "../handlers/list-kikobooks-items.handler.js";

const toolSchema = z.object({
    search: z.string().optional().describe("Search by item name or description"),
    page: z.number().optional().describe("Page number (default: 1)"),
    pageSize: z.number().optional().describe("Results per page (default: 50, max: 500)"),
});

const toolHandler = async (args: any) => {
    const response = await listKikoBooksItems(args);
    if (response.isError) {
        return { content: [{ type: "text" as const, text: `Error listing items: ${response.error}` }] };
    }
    return {
        content: [
            { type: "text" as const, text: "Items:" },
            { type: "text" as const, text: JSON.stringify(response.result, null, 2) },
        ],
    };
};

export const ListItemsTool: ToolDefinition<typeof toolSchema> = {
    name: "list_items",
    description: "List products/services (items) from KikoBooks. Returns paginated results with search support.",
    schema: toolSchema,
    handler: toolHandler,
};
