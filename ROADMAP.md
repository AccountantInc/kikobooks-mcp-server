# KikoBooks MCP Server — Roadmap & Architecture Plan

## What Is This?

A **TypeScript Model Context Protocol (MCP) server** that lets AI assistants (Claude Desktop, VS Code Copilot, OpenAI agents, etc.) interact with **KikoBooks** — your bookkeeping SaaS — through natural language.

Think of it as the same thing QuickBooks and Xero have built:
- [QuickBooks Online MCP Server](https://github.com/qboapi/qbo-mcp-server) — 11 entities, CRUD + Search
- [Xero MCP Server](https://github.com/XeroAPI/xero-mcp-server) — 57 tools, List/Create/Update/Delete

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
| **Industry standard** | Both QuickBooks and Xero MCP servers are public MIT-licensed repos |
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

### Pattern (follows QuickBooks reference)

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

### Phase 1 — Core Accounting (MVP)
*The essentials that every bookkeeping AI agent needs.*

| Entity | Tools | KikoBooks API Endpoints |
|--------|-------|------------------------|
| **Chart of Accounts** | `list_accounts`, `get_account`, `create_account`, `update_account` | `GET /api/GL/Accounts`, `GET /api/GL/Accounts/{id}` |
| **Customers** | `list_customers`, `get_customer`, `create_customer`, `update_customer` | `GET /api/Customers`, `GET /api/Customers/{id}` |
| **Invoices** | `list_invoices`, `get_invoice`, `create_invoice`, `update_invoice` | `GET /api/Invoices`, `GET /api/Invoices/{id}` |
| **Items** | `list_items`, `get_item`, `create_item`, `update_item` | `GET /api/Items`, `GET /api/Items/{id}` |
| **Vendors** | `list_vendors`, `get_vendor`, `create_vendor`, `update_vendor` | `GET /api/Vendors`, `GET /api/Vendors/{id}` |
| **Bills** | `list_bills`, `get_bill`, `create_bill`, `update_bill` | `GET /api/Bills`, `GET /api/Bills/{id}` |
| **Journal Entries** | `list_journal_entries`, `get_journal_entry`, `create_journal_entry` | `GET /api/GeneralLedger/journal-entries` |

**Phase 1 Total: ~28 tools across 7 entities**

### Phase 2 — Payments & Credit
*Completing the AR/AP cycle.*

| Entity | Tools |
|--------|-------|
| **Customer Payments** | `list_payments`, `get_payment`, `create_payment` |
| **Vendor Payments** | `list_vendor_payments`, `get_vendor_payment`, `create_vendor_payment` |
| **Credit Memos** | `list_credit_memos`, `get_credit_memo`, `create_credit_memo` |
| **Sales Receipts** | `list_sales_receipts`, `get_sales_receipt`, `create_sales_receipt` |

**Phase 2 Total: ~16 tools across 4 entities**

### Phase 3 — Banking & Reconciliation
*Bank feeds and matching.*

| Entity | Tools |
|--------|-------|
| **Bank Accounts** | `list_bank_accounts`, `get_bank_account` |
| **Bank Transactions** | `list_bank_transactions`, `get_bank_transaction` |
| **Reconciliation** | `get_reconciliation_status` |

**Phase 3 Total: ~7 tools across 3 entities**

### Phase 4 — Reports & Analytics
*Financial statements and dashboards.*

| Entity | Tools |
|--------|-------|
| **Profit & Loss** | `get_profit_and_loss` |
| **Balance Sheet** | `get_balance_sheet` |
| **Trial Balance** | `get_trial_balance` |
| **AR Aging** | `get_ar_aging` |
| **AP Aging** | `get_ap_aging` |
| **Dashboard** | `get_insights_dashboard` |

**Phase 4 Total: ~6 tools**

### Phase 5 — Advanced Features
*CRM, payroll, fixed assets, recurring transactions.*

| Entity | Tools |
|--------|-------|
| **Deposits** | `list_deposits`, `create_deposit` |
| **Fixed Assets** | `list_fixed_assets`, `get_fixed_asset` |
| **Recurring Invoices** | `list_recurring_invoices` |
| **Recurring Bills** | `list_recurring_bills` |
| **CRM Contacts** | `list_crm_contacts`, `get_crm_contact` |
| **Organization** | `get_organization_details` |

**Phase 5 Total: ~12 tools**

### Grand Total: ~69 tools across 5 phases

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
│   │   ├── list-accounts.tool.ts
│   │   ├── get-account.tool.ts
│   │   ├── create-account.tool.ts
│   │   ├── update-account.tool.ts
│   │   ├── list-customers.tool.ts
│   │   ├── ... (one file per tool)
│   │   └── get-ap-aging.tool.ts
│   ├── handlers/
│   │   ├── list-kikobooks-accounts.handler.ts
│   │   ├── get-kikobooks-account.handler.ts
│   │   ├── ... (one file per handler)
│   │   └── get-kikobooks-ap-aging.handler.ts
│   ├── helpers/
│   │   ├── register-tool.ts
│   │   └── format-error.ts
│   └── types/
│       ├── tool-definition.ts
│       └── tool-response.ts
└── _Reference/               # Keep reference implementations
    ├── quickbooks-online-mcp-server/
    └── xero-mcp-server/
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
| **Phase 0** | Project scaffold, client, auth, server setup | 0 |
| **Phase 1** | Core Accounting (Accounts, Customers, Vendors, Invoices, Bills, Items, Journal Entries) | 28 |
| **Phase 2** | Payments & Credit (AR/AP Payments, Credit Memos, Sales Receipts) | 16 |
| **Phase 3** | Banking (Bank Accounts, Transactions, Reconciliation) | 7 |
| **Phase 4** | Reports (P&L, Balance Sheet, Trial Balance, Aging) | 6 |
| **Phase 5** | Advanced (Fixed Assets, Recurring, CRM, Org Details) | 12 |

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

1. ✅ Analyze reference implementations (QuickBooks + Xero)
2. ✅ Analyze KikoBooks API structure
3. ✅ Create this roadmap
4. 🔲 Scaffold Phase 0 (project setup, client, server, types, helpers)
5. 🔲 Implement Phase 1 tools (28 tools for core accounting)
6. 🔲 Test with Claude Desktop / VS Code
7. 🔲 Publish to npm as `@kikobooks/kikobooks-mcp-server`
8. 🔲 Submit to MCP server directories
