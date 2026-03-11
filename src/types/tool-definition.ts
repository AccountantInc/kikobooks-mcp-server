import { z } from "zod";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export interface ToolDefinition<T extends z.ZodType<any, any>> {
    name: string;
    description: string;
    schema: T;
    handler: (args: z.infer<T>, extra: any) => Promise<CallToolResult>;
}
