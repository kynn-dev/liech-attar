---
name: skill-authoring
description: Use when creating, evaluating, or revising an agent skill, including frontmatter, trigger boundaries, progressive disclosure, references, scripts, and activation tests; do not use for ordinary application documentation, prompt-only rewrites, or executing a skill's domain workflow.
---

# Skill authoring

Create skills that are discoverable, narrowly routed, operationally useful, and maintainable in the current package. Treat a skill as a small contract: its description routes requests, its body defines the common workflow, and optional resources supply only the detail needed for a specific mode.

## Authoring contract

Before writing, record the intended user request, desired observable outcome, in-scope actions, exclusions, side effects, risk boundary, and the host capabilities the skill may rely on. Preserve the user's requested location and authorization. Do not install or activate a skill globally as an implicit part of authoring.

Keep the skill neutral and operational. Do not write identity claims, role-play instructions, or instructions that depend on a particular model identity. Do not assume a different provider runtime, provider-specific directories or commands, lifecycle hooks, callbacks, or hidden activation state. Replace those assumptions with portable file/tool behavior, explicit capability checks, or a documented `NOT_RUN` condition. The normal path must remain understandable without a hook.

## Trigger and exclusion design

Define both positive and negative routing before drafting the body:

- Positive triggers describe the actual intent, artifact, or decision that requires this skill. Include the distinctive nouns and verbs a real request is likely to contain.
- Exclusions name nearby work that should be handled directly or by another skill. Exclude by intent, not by an arbitrary keyword.
- Keep descriptions discriminating and concise. The description is a routing contract, not a summary of every section in the skill.
- Test explicit requests, natural-language variants, implicit requests, near misses, and ambiguous prompts. An ambiguous case should route to clarification or a safer boundary rather than trigger an expansive workflow.

## Required file and frontmatter shape

Each skill is a directory with an uppercase `SKILL.md`. Use current package frontmatter with at least:

```yaml
---
name: skill-name
description: Use when <specific trigger>; do not use for <nearby exclusion>.
---
```

Apply these checks:

- `name` is lowercase kebab-case, matches the directory name exactly, and stays within the package length limit.
- `description` is a plain string, contains a real trigger boundary and useful exclusion, and stays within the validator limit. Do not put angle-bracket placeholders in it.
- Keep only supported optional frontmatter fields. Do not copy legacy `category`, `risk`, `source`, platform, or installation metadata unless the current package explicitly supports it.
- Put purpose, workflow, constraints, outputs, and validation in the Markdown body rather than hiding them in metadata.
- Preserve unrelated existing frontmatter when revising an established skill; change only fields justified by the request.

## Progressive disclosure

Keep `SKILL.md` concise enough to load for every matching request. It should contain the shared purpose, routing boundary, essential invariants, normal workflow, and links to conditional detail.

Add `references/` only when a focused body would otherwise omit material rules, schemas, domain tables, or mode-specific procedures. Link each reference from the section where it is needed and state when to read it. Keep references focused, maintained, and preferably one level deep; do not make a reference router for a skill with no real branching.

Add `scripts/` only when deterministic execution or repeated transformation materially improves reliability. A script must have a narrow interface, avoid hidden side effects and secrets, and be executed in validation. Do not add scripts that merely restate prose or wrap a one-off command. Add assets only when they are actual generated-output inputs, not as instruction storage.

Do not create empty resource directories, placeholder examples, a README, or copied manuals without a concrete packaging requirement. Remove or consolidate a reference or script when the main skill no longer needs it. Every relative link must resolve within the intended skill package, and every resource must have a caller.

## Write the operational body

Use imperative, evidence-oriented instructions. Include only decisions that change behavior or protect a real boundary:

1. State when the skill applies and when it must yield to another workflow.
2. Define the smallest useful workflow, including required inputs, ownership, side effects, and stop conditions.
3. Identify the evidence or artifacts that prove each material result. Distinguish `PASS`, `FAIL`, `NOT_RUN`, and `BLOCKED_EXTERNAL`; do not present an unrun check as proof.
4. Define a stable output or handoff contract when another worker or skill consumes the result.
5. Preserve existing architecture and user scope. Do not turn one example or historical failure into a universal rule.

Avoid generic advice that the host already enforces, repetitive policy text, speculative edge cases, and fixed steps where multiple safe approaches are equivalent. Use absolute wording only for genuine safety, permission, compatibility, or validation invariants.

## Evaluate activation and behavior

Use a small, realistic evaluation matrix rather than checking whether headings or keywords appear in the file:

| Case | Expected result | Evidence |
| --- | --- | --- |
| Direct positive request | Skill activates and follows the intended boundary | Observed routing and output |
| Natural-language variant | Skill activates without requiring exact wording | Observed routing and output |
| Relevant but implicit request | Skill activates only when the outcome needs it | Observed routing and output |
| Near miss or excluded request | Skill does not activate, or routes to the safer alternative | Observed non-activation/routing |
| Missing capability or external dependency | Skill reports `NOT_RUN` or `BLOCKED_EXTERNAL` without fabricating success | Sanitized blocker evidence |

For a new or materially revised skill, test at least one positive case and one exclusion case; use more cases when the description has multiple branches. Give the evaluator only the realistic request and minimum relevant artifacts. Do not seed the intended answer, suspected bug, or expected wording. Inspect the actual behavior and artifact, not just a successful runner exit code.

## Local validation

Run the package's skill validator for each changed skill, then perform a scoped link and content audit:

```text
python -B tools/validate_skills.py .
```

The validator proves basic frontmatter and naming constraints only. Also verify that:

- every relative Markdown link inside the skill resolves to an existing in-scope file;
- the description has both a discriminating trigger and an exclusion;
- references and scripts are justified, linked, and free of provider-specific assumptions;
- activation cases cover positive and exclusion prompts;
- no secret, cookie, key, token, or environment value was read, printed, or persisted;
- changed scripts, when any, run successfully within their documented scope.

Record each check as `PASS`, `FAIL`, `NOT_RUN`, or `BLOCKED_EXTERNAL`. A validator exit of zero does not prove good routing or useful behavior. If an independent evaluation is unavailable, say so explicitly rather than claiming activation coverage.

## Revision and removal rules

When a real evaluation exposes a false positive, false negative, stale instruction, or unnecessary resource, make the smallest supported correction. Re-test the affected trigger and its nearest exclusion. Remove obsolete references, scripts, provider assumptions, hooks, and installation instructions instead of preserving them for historical familiarity. Do not broaden the description or workflow to absorb unrelated requests.

End the authoring handoff with the skill path, changed resources, trigger/exclusion cases, validation commands and states, assumptions, deviations, unresolved risks, and the next action. Keep the report factual and scoped to evidence obtained in the current run.
