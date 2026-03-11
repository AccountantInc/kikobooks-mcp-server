#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { KikoBooksMCPServer } from "./server/kikobooks-mcp-server.js";
import { RegisterTool } from "./helpers/register-tool.js";

// Account tools
import { ListAccountsTool } from "./tools/list-accounts.tool.js";
import { GetAccountTool } from "./tools/get-account.tool.js";
import { CreateAccountTool } from "./tools/create-account.tool.js";
import { UpdateAccountTool } from "./tools/update-account.tool.js";

// Customer tools
import { ListCustomersTool } from "./tools/list-customers.tool.js";
import { GetCustomerTool } from "./tools/get-customer.tool.js";
import { CreateCustomerTool } from "./tools/create-customer.tool.js";
import { UpdateCustomerTool } from "./tools/update-customer.tool.js";

// Invoice tools
import { ListInvoicesTool } from "./tools/list-invoices.tool.js";
import { GetInvoiceTool } from "./tools/get-invoice.tool.js";
import { CreateInvoiceTool } from "./tools/create-invoice.tool.js";
import { UpdateInvoiceTool } from "./tools/update-invoice.tool.js";

// Item tools
import { ListItemsTool } from "./tools/list-items.tool.js";
import { GetItemTool } from "./tools/get-item.tool.js";
import { CreateItemTool } from "./tools/create-item.tool.js";
import { UpdateItemTool } from "./tools/update-item.tool.js";

// Vendor tools
import { ListVendorsTool } from "./tools/list-vendors.tool.js";
import { GetVendorTool } from "./tools/get-vendor.tool.js";
import { CreateVendorTool } from "./tools/create-vendor.tool.js";
import { UpdateVendorTool } from "./tools/update-vendor.tool.js";

// Bill tools
import { ListBillsTool } from "./tools/list-bills.tool.js";
import { GetBillTool } from "./tools/get-bill.tool.js";
import { CreateBillTool } from "./tools/create-bill.tool.js";
import { UpdateBillTool } from "./tools/update-bill.tool.js";

// Journal Entry tools
import { ListJournalEntriesTool } from "./tools/list-journal-entries.tool.js";
import { GetJournalEntryTool } from "./tools/get-journal-entry.tool.js";
import { CreateJournalEntryTool } from "./tools/create-journal-entry.tool.js";

const main = async () => {
    const server = KikoBooksMCPServer.GetServer();

    // Chart of Accounts
    RegisterTool(server, ListAccountsTool);
    RegisterTool(server, GetAccountTool);
    RegisterTool(server, CreateAccountTool);
    RegisterTool(server, UpdateAccountTool);

    // Customers
    RegisterTool(server, ListCustomersTool);
    RegisterTool(server, GetCustomerTool);
    RegisterTool(server, CreateCustomerTool);
    RegisterTool(server, UpdateCustomerTool);

    // Invoices
    RegisterTool(server, ListInvoicesTool);
    RegisterTool(server, GetInvoiceTool);
    RegisterTool(server, CreateInvoiceTool);
    RegisterTool(server, UpdateInvoiceTool);

    // Items
    RegisterTool(server, ListItemsTool);
    RegisterTool(server, GetItemTool);
    RegisterTool(server, CreateItemTool);
    RegisterTool(server, UpdateItemTool);

    // Vendors
    RegisterTool(server, ListVendorsTool);
    RegisterTool(server, GetVendorTool);
    RegisterTool(server, CreateVendorTool);
    RegisterTool(server, UpdateVendorTool);

    // Bills
    RegisterTool(server, ListBillsTool);
    RegisterTool(server, GetBillTool);
    RegisterTool(server, CreateBillTool);
    RegisterTool(server, UpdateBillTool);

    // Journal Entries
    RegisterTool(server, ListJournalEntriesTool);
    RegisterTool(server, GetJournalEntryTool);
    RegisterTool(server, CreateJournalEntryTool);

    // Connect to transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
};

main().catch((error) => {
    console.error("Fatal error starting KikoBooks MCP Server:", error);
    process.exit(1);
});
