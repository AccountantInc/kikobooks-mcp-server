#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { KikoBooksMCPServer } from "./server/kikobooks-mcp-server.js";
import { RegisterTool } from "./helpers/register-tool.js";

// Account tools (Chart of Accounts)
import { SearchAccountsTool } from "./tools/search-accounts.tool.js";
import { GetAccountTool } from "./tools/get-account.tool.js";
import { CreateAccountTool } from "./tools/create-account.tool.js";
import { UpdateAccountTool } from "./tools/update-account.tool.js";

// Customer tools
import { SearchCustomersTool } from "./tools/search-customers.tool.js";
import { GetCustomerTool } from "./tools/get-customer.tool.js";
import { CreateCustomerTool } from "./tools/create-customer.tool.js";
import { UpdateCustomerTool } from "./tools/update-customer.tool.js";
import { DeleteCustomerTool } from "./tools/delete-customer.tool.js";

// Invoice tools
import { SearchInvoicesTool } from "./tools/search-invoices.tool.js";
import { GetInvoiceTool } from "./tools/get-invoice.tool.js";
import { CreateInvoiceTool } from "./tools/create-invoice.tool.js";
import { UpdateInvoiceTool } from "./tools/update-invoice.tool.js";

// Item tools
import { SearchItemsTool } from "./tools/search-items.tool.js";
import { GetItemTool } from "./tools/get-item.tool.js";
import { CreateItemTool } from "./tools/create-item.tool.js";
import { UpdateItemTool } from "./tools/update-item.tool.js";

// Vendor tools
import { SearchVendorsTool } from "./tools/search-vendors.tool.js";
import { GetVendorTool } from "./tools/get-vendor.tool.js";
import { CreateVendorTool } from "./tools/create-vendor.tool.js";
import { UpdateVendorTool } from "./tools/update-vendor.tool.js";
import { DeleteVendorTool } from "./tools/delete-vendor.tool.js";

// Bill tools
import { SearchBillsTool } from "./tools/search-bills.tool.js";
import { GetBillTool } from "./tools/get-bill.tool.js";
import { CreateBillTool } from "./tools/create-bill.tool.js";
import { UpdateBillTool } from "./tools/update-bill.tool.js";
import { VoidBillTool } from "./tools/void-bill.tool.js";

// Journal Entry tools
import { SearchJournalEntriesTool } from "./tools/search-journal-entries.tool.js";
import { GetJournalEntryTool } from "./tools/get-journal-entry.tool.js";
import { CreateJournalEntryTool } from "./tools/create-journal-entry.tool.js";
import { PostJournalEntryTool } from "./tools/post-journal-entry.tool.js";
import { ReverseJournalEntryTool } from "./tools/reverse-journal-entry.tool.js";

// Bill Payment tools (AP)
import { SearchBillPaymentsTool } from "./tools/search-bill-payments.tool.js";
import { GetBillPaymentTool } from "./tools/get-bill-payment.tool.js";
import { CreateBillPaymentTool } from "./tools/create-bill-payment.tool.js";
import { VoidBillPaymentTool } from "./tools/void-bill-payment.tool.js";

// Purchase/Expense tools
import { SearchPurchasesTool } from "./tools/search-purchases.tool.js";
import { GetPurchaseTool } from "./tools/get-purchase.tool.js";
import { CreatePurchaseTool } from "./tools/create-purchase.tool.js";
import { UpdatePurchaseTool } from "./tools/update-purchase.tool.js";
import { DeletePurchaseTool } from "./tools/delete-purchase.tool.js";

// Payment tools (AR)
import { SearchPaymentsTool } from "./tools/search-payments.tool.js";
import { GetPaymentTool } from "./tools/get-payment.tool.js";
import { CreatePaymentTool } from "./tools/create-payment.tool.js";

// Credit Memo tools (AR)
import { SearchCreditMemosTool } from "./tools/search-credit-memos.tool.js";
import { GetCreditMemoTool } from "./tools/get-credit-memo.tool.js";
import { CreateCreditMemoTool } from "./tools/create-credit-memo.tool.js";

// Sales Receipt tools (AR)
import { SearchSalesReceiptsTool } from "./tools/search-sales-receipts.tool.js";
import { GetSalesReceiptTool } from "./tools/get-sales-receipt.tool.js";
import { CreateSalesReceiptTool } from "./tools/create-sales-receipt.tool.js";

const main = async () => {
    const server = KikoBooksMCPServer.GetServer();

    // Chart of Accounts
    RegisterTool(server, SearchAccountsTool);
    RegisterTool(server, GetAccountTool);
    RegisterTool(server, CreateAccountTool);
    RegisterTool(server, UpdateAccountTool);

    // Customers
    RegisterTool(server, SearchCustomersTool);
    RegisterTool(server, GetCustomerTool);
    RegisterTool(server, CreateCustomerTool);
    RegisterTool(server, UpdateCustomerTool);
    RegisterTool(server, DeleteCustomerTool);

    // Invoices
    RegisterTool(server, SearchInvoicesTool);
    RegisterTool(server, GetInvoiceTool);
    RegisterTool(server, CreateInvoiceTool);
    RegisterTool(server, UpdateInvoiceTool);

    // Items
    RegisterTool(server, SearchItemsTool);
    RegisterTool(server, GetItemTool);
    RegisterTool(server, CreateItemTool);
    RegisterTool(server, UpdateItemTool);

    // Vendors
    RegisterTool(server, SearchVendorsTool);
    RegisterTool(server, GetVendorTool);
    RegisterTool(server, CreateVendorTool);
    RegisterTool(server, UpdateVendorTool);
    RegisterTool(server, DeleteVendorTool);

    // Bills
    RegisterTool(server, SearchBillsTool);
    RegisterTool(server, GetBillTool);
    RegisterTool(server, CreateBillTool);
    RegisterTool(server, UpdateBillTool);
    RegisterTool(server, VoidBillTool);

    // Journal Entries
    RegisterTool(server, SearchJournalEntriesTool);
    RegisterTool(server, GetJournalEntryTool);
    RegisterTool(server, CreateJournalEntryTool);
    RegisterTool(server, PostJournalEntryTool);
    RegisterTool(server, ReverseJournalEntryTool);

    // Bill Payments (AP)
    RegisterTool(server, SearchBillPaymentsTool);
    RegisterTool(server, GetBillPaymentTool);
    RegisterTool(server, CreateBillPaymentTool);
    RegisterTool(server, VoidBillPaymentTool);

    // Purchases / Expenses
    RegisterTool(server, SearchPurchasesTool);
    RegisterTool(server, GetPurchaseTool);
    RegisterTool(server, CreatePurchaseTool);
    RegisterTool(server, UpdatePurchaseTool);
    RegisterTool(server, DeletePurchaseTool);

    // Customer Payments (AR)
    RegisterTool(server, SearchPaymentsTool);
    RegisterTool(server, GetPaymentTool);
    RegisterTool(server, CreatePaymentTool);

    // Credit Memos (AR)
    RegisterTool(server, SearchCreditMemosTool);
    RegisterTool(server, GetCreditMemoTool);
    RegisterTool(server, CreateCreditMemoTool);

    // Sales Receipts (AR)
    RegisterTool(server, SearchSalesReceiptsTool);
    RegisterTool(server, GetSalesReceiptTool);
    RegisterTool(server, CreateSalesReceiptTool);

    // Connect to transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
};

main().catch((error) => {
    console.error("Fatal error starting KikoBooks MCP Server:", error);
    process.exit(1);
});
