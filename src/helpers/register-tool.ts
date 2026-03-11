import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { ToolDefinition } from "../types/tool-definition.js";

export function RegisterTool<T extends z.ZodType<any, any>>(
    server: McpServer,
    toolDefinition: ToolDefinition<T>
) {
    server.registerTool(
        toolDefinition.name,
        {
            description: toolDefinition.description,
            inputSchema: toolDefinition.schema,
        },
        toolDefinition.handler as any
    );
}
