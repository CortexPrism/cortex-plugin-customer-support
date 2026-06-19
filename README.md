# Customer Support Automation Suite

Multi-platform support plugin for CortexPrism — Zendesk, Freshdesk, Intercom, Help Scout, and Zoho
Desk integration for ticket triage, AI-drafted responses, duplicate detection, and trending
analysis.

## Installation

```bash
cortex plugin install github:CortexPrism/cortex-plugin-customer-support
```

## Tools

| Tool                      | Description                                                |
| ------------------------- | ---------------------------------------------------------- |
| `support_list_tickets`    | List tickets with status, priority, and assignee filters   |
| `support_get_ticket`      | Get full ticket details with conversation history          |
| `support_draft_response`  | AI-drafted response using KB articles and past resolutions |
| `support_update_ticket`   | Update status, priority, assignee, add internal notes      |
| `support_find_duplicates` | Detect duplicate tickets via semantic similarity           |
| `support_get_trending`    | Identify trending issues and recurring problems            |

## Configuration

```json
{
  "plugins": {
    "cortex-plugin-customer-support": {
      "zendeskSubdomain": "your-subdomain",
      "zendeskEmail": "agent@company.com",
      "zendeskApiToken": "your-token",
      "freshdeskDomain": "your-domain.freshdesk.com",
      "freshdeskApiKey": "your-key",
      "intercomAccessToken": "your-token"
    }
  }
}
```

## Supported Platforms

- **Zendesk** — API token + email
- **Freshdesk** — API key
- **Intercom** — Access token
- **Help Scout** — API key
- **Zoho Desk** — OAuth2

## License

MIT
