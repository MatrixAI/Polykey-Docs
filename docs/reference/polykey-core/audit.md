# Audit

The Audit system in Polykey provides a way to track and retrieve events that occur within the Polykey agent. This feature is essential for security monitoring, troubleshooting, and compliance purposes.

## Overview

The Audit system records various events that occur during the operation of a Polykey node. These events are stored in a structured format and can be retrieved for analysis. The system is designed to be efficient and secure, with events stored in the node's database.

## Core Components

### Audit Class

The `Audit` class is the main component of the audit system. It provides methods for:

- Recording audit events
- Retrieving audit events
- Managing the audit event lifecycle

### Audit Events

Audit events have the following structure:

- `id`: A unique identifier for the event (AuditEventId)
- `path`: An array of strings representing the event category/path
- `data`: The event data, which can contain any relevant information about the event

## Usage

### Retrieving Audit Events

Audit events can be retrieved from a node using the `nodesAuditEventsGet` RPC method. This method supports:

- Pagination through `seek` and `seekEnd` parameters
- Limiting the number of results with the `limit` parameter
- Ordering results in ascending or descending order

Example usage through the node connection:

```typescript
// Retrieve audit events from a connected node
const response = await nodeConnection.getClient().methods.nodesAuditEventsGet({
  seek: 0,                // Start from the beginning or specific audit event ID
  seekEnd: Date.now(),    // End at current time or specific audit event ID
  limit: 100,             // Limit the number of results
  order: 'asc'            // Order results (asc or desc)
});

// Process the audit events
for await (const auditEvent of response) {
  console.log(`Event ID: ${auditEvent.id}`);
  console.log(`Event Path: ${auditEvent.path.join('/')}`);
  console.log(`Event Data:`, auditEvent.data);
}
```

### Event Types

The audit system can record various types of events, including but not limited to:

- Node connection events (e.g., `['node', 'connection', 'forward']`)
- Authentication events (e.g., `['auth', 'success']`, `['auth', 'failure']`)
- Vault operations (e.g., `['vault', 'create']`, `['vault', 'delete']`)
- Secret access events (e.g., `['secret', 'read']`, `['secret', 'write']`)
- Permission changes (e.g., `['permission', 'grant']`, `['permission', 'revoke']`)

Each event type has a specific path structure and data format. The path is an array of strings that categorizes the event, while the data contains relevant information specific to that event type.

## Security Considerations

Audit events are stored locally on the node and are only accessible to authorized users with appropriate permissions. When retrieving audit events from another node, proper authentication and authorization are required.

The audit system is designed to be secure and tamper-resistant, ensuring that audit events cannot be modified or deleted without proper authorization.

## Integration with Other Components

The audit system is integrated with various components of the Polykey system:

- The `PolykeyAgent` includes the audit system in its initialization
- The agent service exposes audit functionality through RPC methods
- Node connections can access audit events from connected nodes

Example of how the audit system is integrated with the PolykeyAgent:

```typescript
// In PolykeyAgent.ts
const agentService = agentServerManifest({
  audit: this.audit,
  acl: this.acl,
  db: this.db,
  keyRing: this.keyRing,
  // ... other components
});
```

## Implementation Details

The audit system is implemented using the following key files:

- `src/audit/Audit.ts`: The main Audit class implementation
- `src/audit/types.ts`: Type definitions for audit events
- `src/audit/utils.ts`: Utility functions for audit operations
- `src/nodes/agent/handlers/NodesAuditEventsGet.ts`: Handler for retrieving audit events
- `src/nodes/agent/callers/nodesAuditEventsGet.ts`: Caller for the audit events RPC method

## Future Enhancements

Future versions of the audit system may include:

- Additional event types for more comprehensive auditing
- Enhanced filtering capabilities based on event paths and data
- Export functionality for audit logs to common formats (CSV, JSON)
- Integration with external logging systems (Syslog, ELK stack)
- Real-time audit event notifications