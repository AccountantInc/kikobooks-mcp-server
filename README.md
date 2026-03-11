# KikoBooks MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server for [KikoBooks](https://kikobooks.com) — enterprise AI-agentic bookkeeping software. This server enables AI assistants like Claude, GitHub Copilot, and OpenAI-powered agents to interact with your KikoBooks accounting data through natural language.

## Features

- **Chart of Accounts** — List, get, create, and update GL accounts
- **Customers** — Full CRUD for customer management
- **Invoices** — Create, search, and manage AR invoices
- **Items** — Manage products and services
- **Vendors** — Full CRUD for vendor management
- **Bills** — Create, search, and manage AP bills
- **Journal Entries** — List, view, and create GL journal entries

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
KIKOBOOKS_BASE_URL=https://dev-kiko.azurewebsites.net
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
        "KIKOBOOKS_BASE_URL": "https://dev-kiko.azurewebsites.net",
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
        "KIKOBOOKS_BASE_URL": "https://dev-kiko.azurewebsites.net",
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
        "KIKOBOOKS_BASE_URL": "https://dev-kiko.azurewebsites.net",
        "KIKOBOOKS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools

### Chart of Accounts
| Tool | Description |
|------|-------------|
| `list_accounts` | List accounts with filtering by category, type, and search |
| `get_account` | Get full account details by ID |
| `create_account` | Create a new GL account |
| `update_account` | Update an existing account |

### Customers
| Tool | Description |
|------|-------------|
| `list_customers` | List customers with search and pagination |
| `get_customer` | Get full customer details by ID |
| `create_customer` | Create a new customer |
| `update_customer` | Update an existing customer |

### Invoices
| Tool | Description |
|------|-------------|
| `list_invoices` | List invoices with status, customer, date, and overdue filters |
| `get_invoice` | Get full invoice details including line items and payments |
| `create_invoice` | Create a new invoice with line items |
| `update_invoice` | Update an existing invoice |

### Items (Products/Services)
| Tool | Description |
|------|-------------|
| `list_items` | List products and services |
| `get_item` | Get item details including pricing |
| `create_item` | Create a new product or service |
| `update_item` | Update an existing item |

### Vendors
| Tool | Description |
|------|-------------|
| `list_vendors` | List vendors with search |
| `get_vendor` | Get full vendor details |
| `create_vendor` | Create a new vendor |
| `update_vendor` | Update an existing vendor |

### Bills (Accounts Payable)
| Tool | Description |
|------|-------------|
| `list_bills` | List bills with status, vendor, date, and overdue filters |
| `get_bill` | Get full bill details including line items |
| `create_bill` | Create a new bill |
| `update_bill` | Update an existing bill |

### Journal Entries
| Tool | Description |
|------|-------------|
| `list_journal_entries` | List entries with date, source, and posted filters |
| `get_journal_entry` | Get full entry with debit/credit lines |
| `create_journal_entry` | Create a manual journal entry (debits must equal credits) |

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
├── index.ts                 # Entry point — registers all tools
├── clients/
│   └── kikobooks-client.ts  # HTTP client with JWT auth
├── server/
│   └── kikobooks-mcp-server.ts  # MCP server singleton
├── tools/                   # Tool definitions (schema + handler glue)
│   ├── list-accounts.tool.ts
│   ├── create-invoice.tool.ts
│   └── ...
├── handlers/                # Business logic (calls API client)
│   ├── list-kikobooks-accounts.handler.ts
│   ├── create-kikobooks-invoice.handler.ts
│   └── ...
├── helpers/                 # Utilities
│   ├── register-tool.ts
│   └── format-error.ts
└── types/                   # TypeScript types
    ├── tool-definition.ts
    └── tool-response.ts
```

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full implementation plan spanning 5 phases:
- **Phase 1** ✅ Core Accounting (27 tools)
- **Phase 2** Payments & Credit (16 tools)
- **Phase 3** Banking & Reconciliation (7 tools)
- **Phase 4** Reports & Analytics (6 tools)
- **Phase 5** Advanced Features (12 tools)

## License

MIT — see [LICENSE](LICENSE)

## Links

- [KikoBooks](https://kikobooks.com)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Advisor8 Inc](https://advisor8.com)
