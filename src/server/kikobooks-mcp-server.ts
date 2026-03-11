import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export class KikoBooksMCPServer {
    private static instance: McpServer | null = null;

    public static GetServer(): McpServer {
        if (KikoBooksMCPServer.instance === null) {
            KikoBooksMCPServer.instance = new McpServer(
                {
                    name: "KikoBooks MCP Server",
                    version: "0.1.0",
                },
                {
                    capabilities: {
                        tools: {},
                    },
                }
            );
        }
        return KikoBooksMCPServer.instance;
    }
}
