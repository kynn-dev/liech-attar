# Distributed architecture gates

Use this reference only when the requirements and evidence make a distributed design a live option. It is a challenge checklist, not a recommendation.

Before proposing service decomposition, Kafka, Kubernetes, a service mesh, a distributed cache, multiple databases, or a complex queue, establish:

- the concrete workload or failure mode that cannot be handled by the current boundary;
- measured or explicitly required concurrency, throughput, latency, availability, or isolation;
- the ownership boundary and data contract that justify a separate runtime;
- consistency, ordering, idempotency, retries, timeouts, backpressure, and replay behavior;
- failure domains, deployment coordination, observability, on-call ownership, and recovery;
- direct infrastructure, staffing, migration, and recurring cost;
- a simpler modular-monolith, single-store, batching, indexing, or bounded-worker alternative;
- a reversible migration and an acceptance test.

For a large realtime chat, inspect fanout, connection/session capacity, backpressure, presence, hot rooms, pub/sub semantics, failure isolation, regional topology, and cost. Do not assume serverless is appropriate without a connection and workload model.
