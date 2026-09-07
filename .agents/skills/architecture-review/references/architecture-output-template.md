# Architecture review output template

Use this template for a substantial review. Replace placeholders with evidence or mark them `UNKNOWN`, `NOT_RUN`, or `INSUFFICIENT_EVIDENCE`.

## SYSTEM_MAP

- Scope and review question:
- Applications and runtime boundaries:
- Modules and dependency direction:
- APIs and contracts:
- Data stores and ownership:
- Caches, queues, and background work:
- Authentication, authorization, and tenant boundaries:
- External dependencies and deployment:
- Observability and failure domains:
- Major data flows:
- Evidence labels (`REPO`, `RUNTIME`, `OPERATIONS`, `INFERENCE`):

## REQUIREMENTS

| Dimension | Classification | Evidence | Consequence if wrong |
| --- | --- | --- | --- |
| Users/concurrency | KNOWN / ASSUMPTION / UNKNOWN | | |
| Throughput and bursts | KNOWN / ASSUMPTION / UNKNOWN | | |
| Latency/SLO | KNOWN / ASSUMPTION / UNKNOWN | | |
| Data volume/retention | KNOWN / ASSUMPTION / UNKNOWN | | |
| Consistency | KNOWN / ASSUMPTION / UNKNOWN | | |
| Security/tenant model | KNOWN / ASSUMPTION / UNKNOWN | | |
| Availability/recovery | KNOWN / ASSUMPTION / UNKNOWN | | |
| Budget/operations/team | KNOWN / ASSUMPTION / UNKNOWN | | |
| Growth assumptions | KNOWN / ASSUMPTION / HYPOTHESIS | | |
| External dependencies | KNOWN / ASSUMPTION / UNKNOWN | | |

## STRENGTHS

Record boundaries and decisions that satisfy the known requirements. Each item needs evidence and a reason to preserve it.

## FINDINGS

Use one complete finding per material issue. Do not manufacture a finding when the evidence is insufficient; record the uncertainty in `UNRESOLVED`.

## TARGET_STATE

For each recommendation, answer: concrete requirement, insufficiency evidence, trigger/scale, introduced cost, simpler alternative, and reason for preference.

## TRADEOFFS

Include operational ownership, monitoring, deployability, failure handling, migration risk, and ongoing cost—not only implementation effort.

## MIGRATION_SEQUENCE

Prefer small reversible steps with a verification gate after each step. State compatibility, rollback, data migration, and observability requirements.

## DO_NOT_CHANGE

Name working architecture that should remain intact and cite why it is sufficient.

## UNRESOLVED

List only unknowns that can change the decision. Pair each with the smallest next evidence-gathering action.
