# Event sourcing decision gates

Event-driven integration is not the same as event sourcing. An event bus or append-only integration log can distribute facts without making the event log the authoritative state history.

Consider true event sourcing only when requirements make the event history authoritative and useful, such as complete domain-history reconstruction, temporal queries, deterministic replay, audit obligations that snapshots cannot satisfy, or domain workflows where the event log is the required source of truth. Establish retention, schema evolution, replay time, projection rebuild, correction, privacy/deletion, consistency, and operational ownership first.

Compare against simpler options:

- ordinary transactional state plus an audit table;
- an outbox for reliable integration events;
- immutable business records plus snapshots;
- a change-data-capture pipeline for downstream consumers.

The review must name the requirement, evidence, scale, cost, operational complexity, and migration path before recommending event sourcing. It must not recommend CQRS or event sourcing merely because the domain is complex or “event-driven.”
