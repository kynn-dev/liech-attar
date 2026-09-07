---
name: orchestrated-delivery
description: Use when a bounded software change needs coordinated workers, independent review, and an evidence-backed release gate; do not use for a small local edit, architecture discovery, or an unauthorized production operation.
---

# Orchestrated delivery

Run a bounded change from repository audit through an explicit integration and publication decision. Keep the primary agent accountable for scope, architecture, integration, evidence, and authorization; use Luna workers only for isolated, verifiable work units.

## Ownership and operating boundary

- **Primary owner:** establishes scope and acceptance criteria, reads repository instructions, owns the plan/DAG, assigns work, inspects every worker diff, integrates changes, runs the aggregate checks, requests the independent review, and makes the final release decision.
- **Luna worker:** owns one explicitly bounded node of the DAG. The work order must name allowed paths, inputs, outputs, dependencies, acceptance checks, and prohibited side effects. A worker does not delegate further, publish, deploy, or decide that the overall task is complete.
- **Astra reviewer:** receives a fresh, independent review brief after integration and proportional validation. The reviewer checks the actual diff and evidence; it is not the implementer and must not be given a presumed conclusion as the answer.
- **User or release owner:** authorizes material external effects such as commit, push, merge, deploy, release, or publication. Approval to implement does not silently authorize all of them.

Preserve dirty worktrees. Capture the baseline before editing, distinguish pre-existing changes from task changes, and never use reset, clean, stash, checkout, or an equivalent overwrite to make a worktree convenient. A worker must stop if another active change overlaps its allowed files or if the execution path cannot be established with reasonable confidence.

## Required result states

Use these exact labels in work orders, validation notes, and the final handoff:

- `PASS`: the named check ran and its result satisfies the stated acceptance criterion.
- `FAIL`: the named check ran and found a defect, regression, or unmet criterion.
- `NOT_RUN`: the check was not executed. Do not infer a pass from static inspection or another check.
- `BLOCKED_EXTERNAL`: the check requires unavailable authority, credentials, service state, network access, or another external condition. Record the exact blocker and the smallest next action.

`APPROVE` is reserved for the independent Astra review gate. It means that the reviewer examined the integrated diff, requested scope, validation evidence, and known gaps and found no material release-blocking issue within that evidence boundary. `APPROVE` is not implied by a worker report, a green local command, or a successful tool call.

## Required delivery sequence

Follow this sequence. Keep evidence for each gate; do not silently skip a phase.

### 1. Audit

Before planning or delegation:

1. Read applicable repository instructions and the requested acceptance criteria.
2. Confirm repository root, branch/worktree identity, target paths, and authorized side effects.
3. Record `git status` and the relevant diff without exposing secrets. Mark pre-existing changes and possible ownership collisions.
4. Map the named execution path far enough to identify the owning files, tests, interfaces, and external boundaries. Do not read or print secrets, cookies, keys, tokens, or unrelated personal data.
5. Classify risk. Stop for an explicit decision when the work would change authentication or authorization, RLS or tenant isolation, cryptography, billing, legal/compliance behavior, production infrastructure, irreversible data, destructive operations, or a public contract whose compatibility is unknown.

The audit output names the scope, owner, risk level, baseline, acceptance criteria, unknowns, and any `BLOCKED_EXTERNAL` conditions.

### 2. Plan the DAG

Convert the request into a directed acyclic graph of bounded nodes. For every node record:

- node id and one accountable owner;
- exact allowed files or interfaces;
- inputs, outputs, acceptance checks, and evidence format;
- dependencies and the reason they exist;
- risk boundary and prohibited side effects;
- whether the primary agent must retain the change because it is shared, architectural, security-sensitive, or integration-heavy.

Run independent nodes in parallel only when their write sets and assumptions do not overlap. Keep shared contracts, cross-cutting changes, migrations, and conflict resolution with the primary owner unless the user explicitly approves another arrangement.

### 3. Assign Luna workers

Give each worker a self-contained work order containing the user intent, node boundary, relevant files, constraints, acceptance checks, and required report fields. Require the worker to:

- inspect the execution path before editing;
- make the smallest coherent change inside its assigned paths;
- preserve unrelated dirty changes and repository conventions;
- add focused tests when appropriate;
- run the narrowest useful validation and report exact commands and outcomes;
- return `PASS`, `FAIL`, `NOT_RUN`, or `BLOCKED_EXTERNAL` with evidence, assumptions, deviations, risks, and blockers.

Do not treat a worker's status as proof. The primary agent independently inspects the files and diff after every worker result.

### 4. Integrate in the primary worktree

The primary agent reviews each worker's actual changes against the baseline and acceptance criteria. Check file scope, behavior, compatibility, tests, and accidental edits before integration. Resolve conflicts deliberately, preserve unrelated work, and reject changes that exceed the work order. Re-run the relevant checks after combining nodes; a passing worker check does not cover integration behavior.

### 5. Validate proportionally

Start with the narrowest relevant test, lint, type, build, or static validation, then expand according to risk and dependency surface. Validate both the changed path and important neighboring contracts. Separate repository evidence from runtime or production evidence.

For every expected check, record the command, scope, result state, and concise evidence. Mark unavailable authenticated, production, or external checks `NOT_RUN` or `BLOCKED_EXTERNAL`; never upgrade them through inference. A failure that predates the change must be labeled as pre-existing only when the baseline evidence supports that conclusion.

### 6. Request an independent Astra review

After integration and proportional validation, provide a fresh Astra review with:

- the original request and acceptance criteria;
- the audit boundary and relevant baseline;
- the integrated diff or exact changed files;
- validation commands and result states;
- known unknowns and external checks that were not run.

Ask for an independent assessment of scope, regressions, security and permission boundaries, compatibility, tests, operational risk, and release readiness. The review must return `APPROVE` only when the evidence supports it; otherwise return findings with `FAIL`, `NOT_RUN`, or `BLOCKED_EXTERNAL` as applicable. A review that cannot inspect the real diff is not an approval.

### 7. Apply the delta

Translate review findings into a minimal delta. The primary agent decides whether a finding is in scope, records any accepted deviation, and changes only the affected paths. Re-run affected validation after every delta. Any material delta invalidates the prior approval for that surface and requires a fresh Astra review; do not carry `APPROVE` forward by assumption.

### 8. Sync, commit, and push

Only after the required validation is `PASS` and the independent review is `APPROVE`:

1. Synchronize the relevant worktrees or branch state without overwriting dirty changes; report conflicts instead of resolving them destructively.
2. Commit only the exact requested files and only when commit authority was explicitly granted.
3. Push only when push authority was explicitly granted, and report the ref and result without exposing credentials.
4. Treat merge, deploy, release, tag, production mutation, or public publication as a separate external effect. Never perform or describe any of them as ready before `APPROVE`.

If commit or push was not authorized, leave the reviewed diff intact and report the exact next action instead of assuming permission. A branch synchronization push that is not itself publication still requires explicit authorization and must not be confused with the review gate.

## Risk limits and stop conditions

Stop and return the evidence rather than guessing when:

- a requested change crosses an authentication, authorization, tenant-isolation, RLS, secret, cryptography, billing, legal, migration, destructive, or production boundary;
- an external service, authenticated session, approval, or permission is unavailable;
- two workers or a worker and the primary agent modify overlapping files without a resolved owner;
- the requested acceptance criterion conflicts with repository instructions or another explicit constraint;
- a check fails and the smallest safe correction is not clear;
- the worktree contains changes whose ownership cannot be established safely.

Do not weaken tests, linting, type checks, validation, security checks, or permission boundaries to obtain `PASS`. Do not publish before `APPROVE`, and do not turn `NOT_RUN` or `BLOCKED_EXTERNAL` into approval.

## Handoff record

End with a concise record containing:

```text
OBJECTIVE
<bounded request and acceptance criteria>

OWNERSHIP
<primary, worker nodes, reviewer, and authorization boundary>

AUDIT
<baseline, dirty-worktree preservation, scope, risks, and unknowns>

DAG
<nodes, dependencies, write sets, and completed/blocked nodes>

CHANGES
<integrated files and any pre-existing changes deliberately preserved>

VALIDATION
<command | PASS/FAIL/NOT_RUN/BLOCKED_EXTERNAL | evidence>

REVIEW
<Astra verdict: APPROVE or the exact findings/state>

DELTA
<review-driven changes and revalidation>

SYNC_COMMIT_PUSH
<what was authorized and performed; otherwise the exact next action>

RISKS_AND_BLOCKERS
<unresolved risks, external blockers, and deviations>
```
