# KikoBooks MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server for [KikoBooks](https://kikobooks.com) — enterprise AI-agentic bookkeeping software. This server enables AI assistants like Claude, GitHub Copilot, and OpenAI-powered agents to interact with your KikoBooks accounting data through natural language.

## Features

- **Chart of Accounts** — Search, get, create, and update GL accounts
- **Customers** — Full CRUD with soft delete for customer management
- **Invoices** — Search, create, and manage AR invoices
- **Items** — Manage products and services
- **Vendors** — Full CRUD with soft delete for vendor management
- **Bills** — Full CRUD with soft delete for AP bills
- **Journal Entries** — Search, create, post, and reverse GL journal entries
- **Bill Payments** — Search, create, and delete AP payments
- **Purchases / Expenses** — Full CRUD with delete for expense transactions
- **Customer Payments** — Search, create, and manage AR payments
- **Credit Memos** — Search, create, and manage AR credit memos
- **Sales Receipts** — Search, create, and manage sales receipts

## Prerequisites

- Node.js 18 or higher
- A KikoBooks account with API access
- An API key from your KikoBooks organization settings

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```env
KIKOBOOKS_BASE_URL=https://mcp.kikobooks.com
KIKOBOOKS_API_KEY=your_api_key_here
```

3. Build:
```bash
npm run build
```

## Configuration

### Claude Desktop

Add to your `claude_desktop_config.json`:

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

### VS Code (GitHub Copilot)

Add to `.vscode/mcp.json` in your project:

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

### Local Development

For local development, point to the built output:

```json
{
  "servers": {
    "kikobooks": {
      "command": "node",
      "args": ["C:/Apps/kikobooks-mcp-server/dist/index.js"],
      "env": {
        "KIKOBOOKS_BASE_URL": "https://mcp.kikobooks.com",
        "KIKOBOOKS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools (50 total)

### Chart of Accounts
| Tool | Description |
|------|-------------|
| `search_accounts` | Search accounts with filtering by category, type, and text |
| `get_account` | Get full account details by ID |
| `create_account` | Create a new GL account |
| `update_account` | Update an existing account |

### Customers
| Tool | Description |
|------|-------------|
| `search_customers` | Search customers with text search and pagination |
| `get_customer` | Get full customer details by ID |
| `create_customer` | Create a new customer |
| `update_customer` | Update an existing customer |
| `delete_customer` | Soft delete (deactivate) a customer |

### Invoices
| Tool | Description |
|------|-------------|
| `search_invoices` | Search invoices with status, customer, date, and overdue filters |
| `get_invoice` | Get full invoice details including line items and payments |
| `create_invoice` | Create a new invoice with line items |
| `update_invoice` | Update an existing invoice |

### Items (Products/Services)
| Tool | Description |
|------|-------------|
| `search_items` | Search products and services |
| `get_item` | Get item details including pricing |
| `create_item` | Create a new product or service |
| `update_item` | Update an existing item |

### Vendors
| Tool | Description |
|------|-------------|
| `search_vendors` | Search vendors with text search |
| `get_vendor` | Get full vendor details |
| `create_vendor` | Create a new vendor |
| `update_vendor` | Update an existing vendor |
| `delete_vendor` | Soft delete (deactivate) a vendor |

### Bills (Accounts Payable)
| Tool | Description |
|------|-------------|
| `search_bills` | Search bills with status, vendor, date, and overdue filters |
| `get_bill` | Get full bill details including line items |
| `create_bill` | Create a new bill |
| `update_bill` | Update an existing bill |
| `delete_bill` | Soft delete (deactivate) a bill |

### Journal Entries
| Tool | Description |
|------|-------------|
| `search_journal_entries` | Search entries with date, source, and posted filters |
| `get_journal_entry` | Get full entry with debit/credit lines |
| `create_journal_entry` | Create a manual journal entry (debits must equal credits) |
| `post_journal_entry` | Post a draft journal entry to the ledger |
| `reverse_journal_entry` | Reverse a posted journal entry |

### Bill Payments (Accounts Payable)
| Tool | Description |
|------|-------------|
| `search_bill_payments` | Search bill payments with vendor.and date filters |
| `get_bill_payment` | Get full bill payment details |
| `create_bill_payment` | Create a new bill payment |
| `delete_bill_payment` | Delete a bill payment |

### Purchases / Expenses
| Tool | Description |
|------|-------------|
| `search_purchases` | Search expense transactions with filters |
| `get_purchase` | Get full expense/purchase details |
| `create_purchase` | Create a new expense/purchase |
| `update_purchase` | Update an existing expense/purchase |
| `delete_purchase` | Delete an expense/purchase |

### Customer Payments (AR)
| Tool | Description |
|------|-------------|
| `search_payments` | Search AR payments with customer and date filters |
| `get_payment` | Get full payment details |
| `create_payment` | Record a customer payment |

### Credit Memos (AR)
| Tool | Description |
|------|-------------|
| `search_credit_memos` | Search credit memos with filters |
| `get_credit_memo` | Get full credit memo details |
| `create_credit_memo` | Create a new credit memo |

### Sales Receipts
| Tool | Description |
|------|-------------|
| `search_sales_receipts` | Search sales receipts with filters |
| `get_sales_receipt` | Get full sales receipt details |
| `create_sales_receipt` | Create a new sales receipt |

## Authentication

The server supports two authentication methods:

### API Key (Recommended)
Set `KIKOBOOKS_API_KEY` — the server automatically exchanges it for JWT tokens and handles refresh.

### Direct Token
Set `KIKOBOOKS_ACCESS_TOKEN` (and optionally `KIKOBOOKS_REFRESH_TOKEN`) if you manage tokens externally.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `KIKOBOOKS_BASE_URL` | Yes | KikoBooks API base URL |
| `KIKOBOOKS_API_KEY` | Yes* | API key for authentication |
| `KIKOBOOKS_ACCESS_TOKEN` | Alt* | Direct JWT access token |
| `KIKOBOOKS_REFRESH_TOKEN` | No | JWT refresh token |
| `KIKOBOOKS_ENVIRONMENT` | No | `sandbox` or `production` |

\* Either `KIKOBOOKS_API_KEY` or `KIKOBOOKS_ACCESS_TOKEN` is required.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run watch

# Lint
npm run lint
```

## Architecture

```
src/
├── index.ts                 # Entry point — registers all 50 tools
├── clients/
│   └── kikobooks-client.ts  # HTTP client with JWT auth (get/post/put/delete)
├── server/
│   └── kikobooks-mcp-server.ts  # MCP server singleton
├── tools/                   # Tool definitions (schema + handler glue)
│   ├── search-accounts.tool.ts
│   ├── create-invoice.tool.ts
│   ├── delete-customer.tool.ts
│   └── ... (50 files)
├── handlers/                # Business logic (calls API client)
│   ├── search-kikobooks-accounts.handler.ts
│   ├── create-kikobooks-invoice.handler.ts
│   ├── delete-kikobooks-customer.handler.ts
│   └── ... (50 files)
├── helpers/                 # Utilities
│   ├── register-tool.ts
│   └── format-error.ts
└── types/                   # TypeScript types
    ├── tool-definition.ts
    └── tool-response.ts
```

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full implementation plan:
- **Phase 1** ✅ Core Bookkeeping (50 tools across 12 entities)
- **Phase 2** Banking & Reconciliation
- **Phase 3** Reports & Analytics
- **Phase 4** Advanced Features

## License

MIT — see [LICENSE](LICENSE)

## Links

- [KikoBooks](https://kikobooks.com)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Advisor8 Inc](https://advisor8.com)
