# KikoBooks MCP Server — Roadmap & Architecture Plan

## What Is This?

A **TypeScript Model Context Protocol (MCP) server** that lets AI assistants (Claude Desktop, VS Code Copilot, OpenAI agents, etc.) interact with **KikoBooks** — your bookkeeping SaaS — through natural language.

It gives AI agents the ability to search, create, update, and manage your accounting data — accounts, invoices, bills, journal entries, payments, and more — all through a standardized MCP interface.

This is **your public/external MCP server** for third-party AI integrations.

> **Note:** KikoBooks already has an **internal** .NET MCP server (`KikoBooks.McpServer`) that connects directly to the database via Dapper/MediatR. This new TypeScript server is different — it calls the **KikoBooks REST API** over HTTP, making it safe for external distribution.

---

## Should The Repo Be Public?

**Yes, make it public.** Here's why:

| Reason | Detail |
|--------|--------|
| **Discoverability** | MCP servers are listed on directories like [glama.ai](https://glama.ai/mcp/servers), [smithery.ai](https://smithery.ai/) — they require public repos |
| **Trust** | Users want to inspect what an MCP server does before granting it API access |
| **NPX distribution** | `npx @kikobooks/kikobooks-mcp-server` requires a public npm package backed by public source |
| **Industry standard** | MCP servers for accounting platforms are public MIT-licensed repos |
| **No secrets exposed** | The server contains zero secrets — all credentials come from environment variables at runtime |

**Recommendation:** Public repo, MIT license, `.env` in `.gitignore`.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    AI Assistant                          │
│         (Claude Desktop / VS Code / OpenAI)             │
└──────────────────────┬──────────────────────────────────┘
                       │ MCP Protocol (STDIO)
                       ▼
┌─────────────────────────────────────────────────────────┐
│               KikoBooks MCP Server                      │
│                  (TypeScript)                            │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Tools   │→ │ Handlers │→ │  KikoBooks API Client │  │
│  │ (Schema) │  │ (Logic)  │  │  (HTTP + JWT Auth)    │  │
│  └──────────┘  └──────────┘  └──────────┬────────────┘  │
└──────────────────────────────────────────┼──────────────┘
                                           │ HTTPS REST
                                           ▼
                              ┌─────────────────────────┐
                              │   KikoBooks API Server   │
                              │   (.NET 10 / Azure)      │
                              │   JWT Bearer Auth        │
                              │   Multi-tenant (Org_Id)  │
                              └─────────────────────────┘
```

### Pattern

| Layer | Responsibility | Example |
|-------|---------------|---------|
| **Tool** | Zod schema + metadata + handler glue | `search-invoices.tool.ts` |
| **Handler** | Business logic, calls client, formats response | `search-kikobooks-invoices.handler.ts` |
| **Client** | HTTP requests, JWT auth, token refresh | `kikobooks-client.ts` |
| **Types** | Shared TypeScript types | `tool-definition.ts`, `tool-response.ts` |
| **Helpers** | Tool registration, error formatting | `register-tool.ts`, `format-error.ts` |
| **Server** | MCP server singleton | `kikobooks-mcp-server.ts` |

---

## Entity & Tool Inventory

### Phase 1 — Core Bookkeeping ✅ (50 tools — COMPLETE)
*All bookkeeping tools an AI agent needs.*

| Entity | Tools | KikoBooks API Endpoints |
|--------|-------|------------------------|
| **Chart of Accounts** | `search_accounts`, `get_account`, `create_account`, `update_account` | `/api/GL/Accounts` |
| **Customers** | `search_customers`, `get_customer`, `create_customer`, `update_customer`, `delete_customer` | `/api/Customers` |
| **Invoices** | `search_invoices`, `get_invoice`, `create_invoice`, `update_invoice` | `/api/Invoices` |
| **Items** | `search_items`, `get_item`, `create_item`, `update_item` | `/api/Items` |
| **Vendors** | `search_vendors`, `get_vendor`, `create_vendor`, `update_vendor`, `delete_vendor` | `/api/Vendors` |
| **Bills** | `search_bills`, `get_bill`, `create_bill`, `update_bill`, `void_bill` | `/api/Bills` |
| **Journal Entries** | `search_journal_entries`, `get_journal_entry`, `create_journal_entry`, `post_journal_entry`, `reverse_journal_entry` | `/api/GeneralLedger/journal-entries` |
| **Bill Payments** | `search_bill_payments`, `get_bill_payment`, `create_bill_payment`, `void_bill_payment` | `/api/VendorPayments` |
| **Purchases/Expenses** | `search_purchases`, `get_purchase`, `create_purchase`, `update_purchase`, `delete_purchase` | `/api/Expenses` |
| **Customer Payments** | `search_payments`, `get_payment`, `create_payment` | `/api/Payments` |
| **Credit Memos** | `search_credit_memos`, `get_credit_memo`, `create_credit_memo` | `/api/CreditMemos` |
| **Sales Receipts** | `search_sales_receipts`, `get_sales_receipt`, `create_sales_receipt` | `/api/SalesReceipts` |

**Phase 1 Total: 50 tools across 12 entities**

### Phase 2 — Banking & Reconciliation (planned)

| Entity | Tools |
|--------|-------|
| **Bank Accounts** | `search_bank_accounts`, `get_bank_account` |
| **Bank Transactions** | `search_bank_transactions`, `get_bank_transaction` |
| **Reconciliation** | `get_reconciliation_status` |

### Phase 3 — Reports & Analytics (planned)

| Entity | Tools |
|--------|-------|
| **Profit & Loss** | `get_profit_and_loss` |
| **Balance Sheet** | `get_balance_sheet` |
| **Trial Balance** | `get_trial_balance` |
| **AR Aging** | `get_ar_aging` |
| **AP Aging** | `get_ap_aging` |
| **Dashboard** | `get_insights_dashboard` |

### Phase 4 — Advanced Features (planned)

| Entity | Tools |
|--------|-------|
| **Deposits** | `search_deposits`, `create_deposit` |
| **Fixed Assets** | `search_fixed_assets`, `get_fixed_asset` |
| **Recurring Invoices** | `search_recurring_invoices` |
| **Recurring Bills** | `search_recurring_bills` |
| **Organization** | `get_organization_details` |

---

## Authentication Strategy

### For the MCP Server → KikoBooks API

```
AI Client → MCP Server → KikoBooks API
                 │
                 ├── Option 1: API Key (simplest)
                 │   KIKOBOOKS_API_KEY=xxx
                 │   Exchanges for JWT token automatically
                 │
                 ├── Option 2: Direct JWT Token
                 │   KIKOBOOKS_ACCESS_TOKEN=xxx
                 │   KIKOBOOKS_REFRESH_TOKEN=xxx
                 │
                 └── Option 3: Username/Password (dev only)
                     KIKOBOOKS_EMAIL=user@example.com
                     KIKOBOOKS_PASSWORD=xxx
```

### Environment Variables

```env
# Required
KIKOBOOKS_BASE_URL=https://mcp.kikobooks.com
KIKOBOOKS_API_KEY=your_api_key_here

# Or manual token management
KIKOBOOKS_ACCESS_TOKEN=your_jwt_token
KIKOBOOKS_REFRESH_TOKEN=your_refresh_token

# Optional
KIKOBOOKS_ENVIRONMENT=sandbox   # sandbox | production
```

---

## Project Structure

```
kikobooks-mcp-server/
├── .env.example
├── .gitignore
├── LICENSE                    # MIT
├── README.md
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              # Entry point
│   ├── clients/
│   │   ├── kikobooks-client.ts    # HTTP client + JWT auth
│   │   └── GETTING_STARTED.md
│   ├── server/
│   │   └── kikobooks-mcp-server.ts # MCP server singleton
│   ├── tools/
│   │   ├── search-accounts.tool.ts
│   │   ├── get-account.tool.ts
│   │   ├── create-account.tool.ts
│   │   ├── update-account.tool.ts
│   │   ├── search-customers.tool.ts
│   │   ├── ... (one file per tool, 50 total)
│   │   └── create-sales-receipt.tool.ts
│   ├── handlers/
│   │   ├── search-kikobooks-accounts.handler.ts
│   │   ├── get-kikobooks-account.handler.ts
│   │   ├── ... (one file per handler, 50 total)
│   │   └── create-kikobooks-sales-receipt.handler.ts
│   ├── helpers/
│   │   ├── register-tool.ts
│   │   └── format-error.ts
│   └── types/
│       ├── tool-definition.ts
│       └── tool-response.ts
└── _Reference/               # Reference implementations
    └── ...
```

---

## Claude Desktop / VS Code Configuration

Once published, users will configure it like this:

### Claude Desktop (`claude_desktop_config.json`)
```json
{
  "mcpServers": {
    "kikobooks": {
      "command": "npx",
      "args": ["-y", "@kikobooks/kikobooks-mcp-server@latest"],
      "env": {
        "KIKOBOOKS_BASE_URL": "https://mcp.kikobooks.com",
        "KIKOBOOKS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### VS Code (`.vscode/mcp.json`)
```json
{
  "servers": {
    "kikobooks": {
      "command": "npx",
      "args": ["-y", "@kikobooks/kikobooks-mcp-server@latest"],
      "env": {
        "KIKOBOOKS_BASE_URL": "https://mcp.kikobooks.com",
        "KIKOBOOKS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

---

## Implementation Timeline

| Phase | Scope | Tools |
|-------|-------|-------|
| **Phase 0** ✅ | Project scaffold, client, auth, server setup | 0 |
| **Phase 1** ✅ | Core Bookkeeping (12 entities: Accounts, Customers, Vendors, Items, Invoices, Bills, Journal Entries, Bill Payments, Purchases, Payments, Credit Memos, Sales Receipts) | 50 |
| **Phase 2** | Banking (Bank Accounts, Transactions, Reconciliation) | TBD |
| **Phase 3** | Reports (P&L, Balance Sheet, Trial Balance, Aging) | TBD |
| **Phase 4** | Advanced (Fixed Assets, Recurring, Org Details) | TBD |

---

## Key Differences from Internal MCP Server

| Feature | Internal (.NET) | External (TypeScript) |
|---------|----------------|----------------------|
| **Access** | Direct DB (Dapper/EF Core) | REST API (HTTP) |
| **Auth** | McpAuthContext (config-based) | JWT Bearer tokens |
| **Distribution** | Part of KikoBooks solution | Standalone npm package |
| **Users** | HT developers only | Any KikoBooks customer |
| **Write approval** | AI_Suggestion tiers | Deferred to API server |
| **Transport** | STDIO (VS Code) | STDIO (any MCP client) |

---

## Tech Stack

- **Runtime:** Node.js 18+
- **Language:** TypeScript 5.8+
- **MCP SDK:** `@modelcontextprotocol/sdk` (latest)
- **Validation:** Zod 3.x
- **HTTP:** Built-in `fetch` (Node 18+)
- **Auth:** JWT token management
- **Build:** `tsc` → ESM modules

---

## Next Steps

1. ✅ Analyze reference implementations
2. ✅ Analyze KikoBooks API structure
3. ✅ Create this roadmap
4. ✅ Scaffold Phase 0 (project setup, client, server, types, helpers)
5. ✅ Implement Phase 1 tools (50 tools for core bookkeeping)
6. 🔲 Test with Claude Desktop / VS Code
7. 🔲 Publish to npm as `@kikobooks/kikobooks-mcp-server`
8. 🔲 Submit to MCP server directories
