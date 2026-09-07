---
name: architecture-review
description: Investigate an existing system or proposed architecture with repository or runtime evidence, separate known requirements from speculation, and recommend the smallest architecture that satisfies the constraints. Use for substantial architecture reviews; do not use for a small local design choice or as a generic best-practices persona.
---

# Architecture review

Use this skill to investigate architecture, not to perform architectural theater. The output is an evidence-backed review that makes the smallest justified recommendation and preserves working structure when it is sufficient.

## Non-negotiable invariant

> Never recommend architectural complexity without identifying the concrete requirement that pays for it.

Do not recommend a technology, topology, pattern, or service boundary because it is fashionable or associated with scale. A modular monolith is a valid target. Microservices, Kubernetes, Kafka, service meshes, CQRS, event sourcing, distributed caches, multiple databases, and elaborate queues require a concrete requirement, evidence of insufficiency, and an explicit accounting of their operational cost.

Never claim `architecture validated`, `analysis successful`, `no findings`, or `healthy architecture` unless the evidence scope, method, and result genuinely support the claim. Prefer a bounded statement such as “no material issue was observed in the inspected paths” and name what was not inspected.

## When to use

Use for a substantial review of an existing system or a materially proposed architecture, including a request to:

- map services, modules, data flows, runtime boundaries, or ownership;
- assess a proposed split, platform, database, queue, cache, or consistency model;
- review tenant isolation, authorization boundaries, failure domains, or deployability;
- compare a monolith, modular monolith, and distributed alternatives;
- determine whether scale, latency, availability, auditability, or offline behavior justifies added complexity;
- produce an incremental migration sequence.

For a small local question such as “should this function live in module A or B?”, answer directly with the local evidence. Do not invoke a full architecture pipeline merely because the word “architecture” appears.

## Operating rules

1. Establish actual requirements before choosing a target. Record expected users and concurrency, throughput, latency, data volume, consistency, security and tenant model, uptime, deployment environment, budget, operational capacity, growth assumptions, and external dependencies. Label each item `KNOWN`, `CONSTRAINT`, `ASSUMPTION`, `HYPOTHESIS`, or `UNKNOWN`.
2. Map the current system from evidence. Inspect runtime entry points, imports, deployment files, APIs, database access, queues, caches, authentication, authorization, storage, observability, and major data flows. Do not infer a runtime boundary solely from a directory name when code or deployment evidence is available.
3. Record strengths before risks. Identify boundaries, data ownership, state management, consistency, idempotency, retries, timeouts, observability, deployability, and operational practices that already fit the requirements.
4. For every material recommendation, answer all six questions:
   - What concrete requirement or failure mode motivates it?
   - What evidence shows the current architecture is insufficient?
   - At what scale or condition does the problem become relevant?
   - What complexity, cost, and operational burden does it introduce?
   - What simpler alternative exists?
   - Why is this option preferable despite those costs?
5. Prefer an evolutionary migration. Separate diagnosis from an accepted architectural decision and from implementation delivery. A review may recommend an ADR; it does not create one automatically.
6. Make uncertainty visible. If evidence is missing, state `UNRESOLVED` or `NOT_RUN`; do not turn a hypothetical future into a current requirement.

## Evidence discipline

Use the strongest available evidence and label its provenance:

- `REPO`: source, configuration, deployment, schema, tests, or measured local behavior;
- `RUNTIME`: authenticated or otherwise authorized observation of the running system;
- `OPERATIONS`: logs, metrics, incidents, capacity records, cost records, or runbooks;
- `REQUIREMENT`: an explicit product, compliance, security, or service-level constraint;
- `INFERENCE`: a reasoned conclusion that must name its supporting evidence;
- `UNKNOWN`: a decision-relevant fact not established by the review.

Do not treat a filename, a worker report, a static grep, a diagram, or a successful script exit code as proof of runtime behavior. Distinguish `PASS`, `FAIL`, `NOT_RUN`, `INSUFFICIENT_EVIDENCE`, and `BLOCKED_EXTERNAL` in verification notes.

## Review workflow

### 1. Requirements and decision frame

Write the question being decided and the evidence boundary. Extract confirmed constraints and scale assumptions. If the only driver is “we may grow”, quantify current and expected traffic, burst shape, hot paths, and a time horizon before proposing redesign.

### 2. Current system map

Describe:

- applications, services, modules, and runtime/deployment boundaries;
- API and event contracts;
- primary data stores, ownership, indexes, caches, and replicas;
- background work, queues, scheduling, retries, and idempotency;
- authentication, authorization, tenant derivation, and isolation;
- file/object storage and external dependencies;
- observability, alerting, failure domains, and release process;
- the most important synchronous and asynchronous data flows.

Mark each edge as `EVIDENCED`, `INFERRED`, or `UNKNOWN`.

### 3. Architectural dimensions

Review only dimensions relevant to the question, including cohesion, coupling, dependency direction, ownership boundaries, state management, API compatibility, tenant isolation, consistency, caching, retries and timeouts, concurrency, observability, deployability, failure isolation, migration safety, performance, scalability, cost, operational complexity, and developer ergonomics.

### 4. Findings

Report material findings with this schema:

```text
ID: ARCH-###
Severity: P0 | P1 | P2 | P3
Area: <dimension>
Evidence: <paths, measurements, requirements, or runtime observations>
Current behavior: <what the system does now>
Risk/consequence: <why it matters>
Trigger/scale: <condition at which it matters; distinguish current from future>
Recommended outcome: <smallest justified change>
Simpler alternative: <lower-complexity option>
Tradeoffs: <benefits, costs, operational burden, and reversibility>
Migration impact: <incremental steps and compatibility constraints>
Verification / acceptance test: <observable proof>
```

Use severity conservatively:

- `P0`: critical architecture, security, or data-integrity failure;
- `P1`: major systemic risk;
- `P2`: important design or operational concern;
- `P3`: optimization or cleanup.

Do not inflate a concern because a more distributed design is possible.

### 5. Target and migration

Recommend a target only for findings that survive the six-question test. State what remains a modular monolith or existing boundary, what changes, why the target is sufficient, and what would trigger a later evolution. Give an incremental sequence with rollback or compatibility points. Prefer measurement, indexing, batching, bounded workers, a single durable store, or a clearer module boundary before a new distributed subsystem.

### 6. Review result

End with the required output sections below. A conclusion is a decision aid, not a release approval. If a claim needs an authenticated production check that was not available, mark it `NOT_RUN`.

## Default output contract

```text
SYSTEM_MAP
<current topology, boundaries, flows, ownership, and evidence labels>

REQUIREMENTS
<known constraints, scale, SLOs, costs, team/operations, and explicit unknowns>

STRENGTHS
<working boundaries and decisions that fit the requirements>

FINDINGS
<zero or more findings using the complete schema; state evidence scope if none are material>

TARGET_STATE
<only the architecture justified by the findings, including why simpler options are insufficient>

TRADEOFFS
<gains, costs, operational complexity, failure modes, and reversibility>

MIGRATION_SEQUENCE
<incremental steps, compatibility/rollback points, and verification gates>

DO_NOT_CHANGE
<architecture that is working and should be preserved, with evidence>

UNRESOLVED
<unknowns that can change the recommendation and the exact evidence needed>
```

## Routing and boundaries

- For substantial repository reconnaissance or system mapping, route to GPT-5.6 Luna Max when available. Luna collects evidence; it does not decide the target architecture.
- For substantial architectural reasoning, tradeoffs, scale challenges, target state, and independent review, prefer a fresh GPT-6 Astra Medium call when available. Do not keep Astra resident for routine file inspection, test watching, or repository scanning.
- A small/local architecture question can be handled directly without the full orchestration pipeline.
- `orchestrated-delivery` executes an approved substantial change through audit, planning, workers, integration, review, and publication. It does not replace architectural reasoning.
- `architecture-decision-records` records a materially accepted decision after the decision exists. It does not investigate the system and does not turn every finding into an ADR.
- Pattern references are consulted only after requirements and evidence justify considering the pattern. They are not recommendations by themselves.

### Selective references

- Read `references/architecture-output-template.md` when a review needs a
  reusable handoff shape or a machine-readable report.
- Read `references/architecture-evaluation-rubric.md` when evaluating whether a
  response contains requirements, evidence, alternatives, cost, migration, and
  `DO_NOT_CHANGE` rather than generic advice.
- Read `references/distributed-architecture-gates.md` before considering
  microservices, Kubernetes, Kafka, a service mesh, multiple regions, or other
  distributed infrastructure.
- Read `references/event-sourcing-gates.md` before considering event sourcing;
  first distinguish integration events, audit history, outbox delivery, and an
  event-sourced source of truth.

## Safety and anti-theater checks

Before finalizing, verify that the review:

- distinguishes event-driven integration from true event sourcing and asks for historical reconstruction, replay, audit, or temporal-query requirements;
- distinguishes authentication from authorization and tenant isolation;
- examines fanout, session infrastructure, backpressure, failure domains, capacity, and cost for realtime workloads;
- treats offline synchronization and conflict resolution as first-class requirements;
- bases caching, replicas, and queues on observed access patterns and consistency needs;
- explicitly considers a modular monolith for small teams and ordinary CRUD;
- includes a `DO_NOT_CHANGE` section;
- never promotes a placeholder analyzer, empty findings array, or success exit code to architectural evidence.

This skill intentionally ships without an architecture analyzer script. A deterministic utility may be added only when it performs a real, testable operation and reports its limited scope without implying architectural approval.
