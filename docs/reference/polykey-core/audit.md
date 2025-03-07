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

- `id`: A unique identifier for the event
- `path`: An array of strings representing the event category/path
- `data`: The event data, which can contain any relevant information about the event

## Usage

### Retrieving Audit Events

Audit events can be retrieved from a node using the `nodesAuditEventsGet` RPC method. This method supports:

- Pagination through `seek` and `seekEnd` parameters
- Limiting the number of results with the `limit` parameter
- Ordering results in ascending or descending order

Example usage through the node connection:



### Event Types

The audit system can record various types of events, including but not limited to:

- Node connection events
- Authentication events
- Vault operations
- Secret access events
- Permission changes

Each event type has a specific path structure and data format.

## Security Considerations

Audit events are stored locally on the node and are only accessible to authorized users with appropriate permissions. When retrieving audit events from another node, proper authentication and authorization are required.

## Integration with Other Components

The audit system is integrated with various components of the Polykey system:

- The `PolykeyAgent` includes the audit system in its initialization
- The agent service exposes audit functionality through RPC methods
- Node connections can access audit events from connected nodes

## Future Enhancements

Future versions of the audit system may include:

- Additional event types
- Enhanced filtering capabilities
- Export functionality for audit logs
- Integration with external logging systems