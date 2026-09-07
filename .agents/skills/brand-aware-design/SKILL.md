---
name: brand-aware-design
description: "Design visual direction from explicit brand and product evidence, separating confirmed requirements from reversible creative decisions and unknowns. Use for brand-sensitive UI or visual work; exclude generic SaaS styling and unsupported positioning."
metadata:
  risk: unknown
  source: workspace
  date_added: "2026-09-07"
---

# Brand-Aware Design

Make visual decisions that are accountable to evidence. A brand-aware result is not a guessed palette, a fashionable style, or a familiar SaaS template; it is a clear record of what the source establishes, what the designer proposes, and what remains unknown.

## Trigger and exclusion boundary

Use this skill when a request asks to:

- apply or preserve a brand identity in UI, product surfaces, campaigns, or visual systems;
- review whether a design is consistent with an existing brand;
- establish a design direction from supplied brand files, public repository evidence, or approved guidelines;
- adapt a known identity across responsive states, components, or channels.

Do not use it for:

- inventing brand positioning, audience, values, naming, or claims without evidence;
- generic “make it look premium/modern” work with no source or product context;
- copy-only tasks, where human-copywriting applies;
- substantial implementation architecture or performance analysis, where frontend-design or architecture-review applies;
- borrowing another brand's identity because the target evidence is missing.

## Evidence classes

Maintain these classes in every material design decision:

| Class | Meaning | What to do |
| --- | --- | --- |
| CONFIRMED | Directly supported by an approved brief, existing product, public file, design token, asset, or cited guideline. | Preserve it unless the user authorizes a change; cite the source. |
| CREATIVE DECISION | A reversible choice made to fill a gap or satisfy a brief. | Label it, explain the rationale, and keep an alternative available. |
| UNKNOWN | Not established by the available evidence or contradicted by sources. | Ask, use a neutral placeholder, or defer. Never silently promote it to confirmed. |
| CONFLICT | Two sources disagree or the requested change would break a confirmed constraint. | Show the conflict and ask for resolution; do not arbitrate by taste. |

A product domain, company name, existing code, or common industry pattern is not by itself a brand specification.

## Operating workflow

1. State the evidence boundary: files, links, approved references, and existing implementation actually inspected. Do not imply that private, remote, or secret sources were checked.
2. Inventory existing identity: logo treatment, type, colors, spacing, imagery, iconography, component patterns, tone, density, motion, and responsive behavior. Record exact paths or source names.
3. Build a short evidence table with CONFIRMED, CREATIVE DECISION, UNKNOWN, and any CONFLICT.
4. Define the design problem and user task. A brand decision must still serve comprehension, action, accessibility, and maintainability.
5. Propose the smallest coherent direction. Preserve existing identity where it is sufficient; introduce new choices only where the evidence or task requires them.
6. Validate contrast, focus, keyboard behavior, content states, responsive layouts, reduced motion, and long or localized content. Use frontend-design for implementation-level guidance.
7. Handoff with explicit decisions, unresolved gaps, and what must not be changed without approval.

## Avoid generic SaaS output

Do not use a purple-on-white gradient, dashboard cards, rounded containers, stock “premium” language, arbitrary serif/sans pairing, or a trendy effect as a substitute for evidence. Do not call a direction editorial, luxury, playful, technical, organic, or minimal unless that description is confirmed or clearly labeled as a creative proposal.

Avoid flattening an existing identity into a neutral component library. If the product is operational, preserve useful density and task orientation; if it is editorial, preserve reading rhythm and hierarchy; if the source does not establish either, mark the choice UNKNOWN and propose a reversible test.

## Required output

Use a compact format suited to the request, but include:

- Evidence boundary and source paths;
- Confirmed visual/product requirements;
- Creative decisions and rationale;
- Unknowns, conflicts, and questions;
- Do-not-change constraints;
- Accessibility and responsive implications;
- Implementation or review result, with checks actually run.

Never claim “on-brand” as a fact when the brand source is incomplete. Say “consistent with the inspected evidence” and name the evidence scope.

## Related profiles

- `frontend-design` owns implementation, responsive behavior, and accessibility.
- `human-copywriting` owns factual, human copy when copy is in scope.
- Select exactly one explicit brand profile: `liech-brand`, `viskie-brand`, or
  `fabiula-brand`. Do not load all directions into an unrelated repository.
