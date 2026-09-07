---
name: liech-brand-direction
description: "Apply Liech or Liech Hub visual and product direction only from cited public evidence in this checkout. Preserve the documented operational, perfumery, and human-confirmation constraints; do not invent a color system, logo rules, voice, or positioning."
metadata:
  risk: unknown
  source: workspace
  date_added: "2026-09-07"
---

# Liech Brand Direction

This skill is the Liech-specific evidence layer for brand-aware design. It does not replace a missing brand book. It distinguishes documented product and UI constraints from creative choices that still require approval.

## Trigger and exclusion boundary

Use when the request explicitly names Liech, Liech Parfums, Liech Hub, or Eter and asks for visual direction, UI styling, product copy context, or brand consistency.

Do not use it for Viskie, Fabiula, an unrelated brand, generic SaaS styling, unsupported marketing claims, or production/deployment work. Do not treat the existence of a Liech repository as permission to infer a logo, color palette, typography, photography direction, public tagline, audience promise, or approved brand voice.

## Evidence boundary and confirmed requirements

The available evidence is limited to public repository files and skills in this staging checkout. The following are confirmed repository/product constraints:

| Status | Evidence | Constraint |
| --- | --- | --- |
| CONFIRMED | `references/liech-evidence-register.md` | Liech Parfums is the named context; the Hub is an internal operational SPA covering production, perfume formulation, and CRM. |
| CONFIRMED | `references/liech-evidence-register.md` | The product direction is internal operations first, vertical perfumery product later, and not a generic CRM or ERP. |
| CONFIRMED | `references/liech-evidence-register.md` | The current operational UI is dense and task-oriented, with persistent sidebars, tables, KPI cards, kanbans, drawers/modals, dark/light theme, and dark mode as the current primary experience. |
| CONFIRMED | `references/liech-evidence-register.md` | Operational screens should answer “what do I do now?”, show useful loading/empty/error states, keep important entities traceable, and support essential mobile actions. |
| CONFIRMED | `references/liech-evidence-register.md` | Eter must separate found data, inference, hypothesis, sources, and uncertainty; it must not invent technical facts or make critical changes without human confirmation. |

These facts guide product and interaction decisions. They are not a complete visual identity or public positioning statement.

## Explicit gaps

No inspected public/skill source establishes:

- official logo usage, color tokens, typography, imagery, illustration, or motion rules;
- a public-facing Liech brand book or approved voice guide;
- audience segmentation, market positioning, tagline, proof points, campaign claims, or competitive claims;
- a universal visual style for every Liech surface.

Treat each item as UNKNOWN. Ask for the authoritative source or mark any proposal as a reversible CREATIVE DECISION. Do not convert “perfumery”, “internal hub”, “dark mode”, or “operational” into an invented palette, luxury aesthetic, or marketing promise.

## Direction workflow

1. Start with the evidence table above, then inspect the target surface for existing tokens, components, assets, copy, density, and responsive behavior.
2. Separate CONFIRMED product/UI requirements from CREATIVE DECISIONS and UNKNOWN brand details.
3. Preserve task orientation, traceability, accessibility, source/uncertainty visibility, and human confirmation boundaries.
4. Avoid generic SaaS dashboards, decorative hero sections inside operational flows, unsupported “premium” language, and visual changes that hide or dilute the next action.
5. For missing identity details, choose the smallest reversible option, label it, and list the approval needed.
6. Use frontend-design for implementation and responsive/motion checks, and brand-aware-design for the evidence table and handoff.

## Required handoff

Report:

- source paths and evidence scope;
- confirmed requirements preserved;
- creative decisions and alternatives;
- UNKNOWN gaps and questions;
- do-not-change constraints;
- accessibility, responsive, and motion implications;
- checks actually run and any NOT_RUN items.

Say “consistent with the inspected Liech Hub evidence” rather than “official Liech brand” unless an approved brand source is supplied.

## Related profiles

Use `brand-aware-design`, `frontend-design`, and `human-copywriting` only when
the corresponding creative or implementation work is in scope. The
`liech-brand` profile supplies the shared creative dependencies without loading
the Viskie or Fabiula directions.
