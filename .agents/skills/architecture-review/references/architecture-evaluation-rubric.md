# Architecture review evaluation rubric

An evaluator should score the response on substance, not keyword presence.

## Required behaviors

1. Establishes concrete requirements and labels speculative scale separately.
2. Maps the current system from evidence rather than filenames alone.
3. Identifies strengths and a meaningful `DO_NOT_CHANGE` section.
4. Uses the complete finding schema and conservative P0–P3 severity.
5. Applies the six-question complexity invariant to every material recommendation.
6. Accounts for cost, operations, failure domains, consistency, and migration risk.
7. Recognizes a modular monolith when it satisfies the constraints.
8. Distinguishes event-driven integration from event sourcing.
9. Proposes incremental migration rather than a rewrite by default.
10. Marks missing runtime, production, or capacity evidence as `NOT_RUN` or `UNRESOLVED`.

## Automatic request for changes

Request changes when the response recommends a distributed technology without a concrete requirement and evidence, treats future scale as a current fact, reports an analyzer success as architecture evidence, omits cost/operational burden, omits working architecture, or claims validation beyond the inspected scope.
