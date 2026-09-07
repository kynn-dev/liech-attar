---
name: browser-automation
description: Automate an authorized browser session for focused UI interaction, inspection, or a small reproducible browser check. Use for Playwright/Puppeteer locator and wait problems; use e2e-testing-patterns for a complete end-to-end test suite, and never bypass authentication, rate limits, bot controls, or user consent.
---

# Browser automation

Use this skill for a bounded browser interaction or diagnostic check in an
authorized environment. It helps choose stable locators, synchronize on
observable state, capture useful failure evidence, and clean up browser state.
It is not a permission to access an account, scrape a site, evade controls, or
run destructive actions.

## Scope boundary

Use `browser-automation` for:

- a focused Playwright or Puppeteer interaction;
- reproducing a visible browser failure;
- inspecting a page or network response that the user has authorized;
- a small smoke check of a route or user-facing state.

Use `e2e-testing-patterns` for a multi-route suite, fixture strategy, CI
parallelization, flaky-test program, or release gate. Use `frontend-design` for
layout, accessibility, responsive behavior, or visual implementation. Use
`security-review` for authentication, authorization, secret handling, or
cross-tenant conclusions.

## Safe operating contract

1. Confirm the target, allowed account/session, environment, and non-destructive
   success condition before interacting.
2. Do not request, print, persist, or fabricate passwords, cookies, tokens,
   API keys, or recovery codes. If a valid session is unavailable, record the
   check as `NOT_RUN`.
3. Do not bypass CAPTCHAs, rate limits, access controls, origin checks, or bot
   protections. Stop at the boundary and report the exact external blocker.
4. Use dedicated test data and a non-production target for mutation checks.
5. Record what was actually observed, what was inferred, and what was not run.

## Reliable interaction patterns

Prefer user-facing locators, in this order:

1. `getByRole` with an accessible name;
2. `getByLabel` or `getByText`;
3. an explicit `data-testid` contract;
4. CSS or XPath only when the preceding contracts cannot express the target.

Wait for the condition that matters rather than sleeping:

```ts
await page.goto('/dashboard');
await page.getByRole('heading', { name: 'Dashboard' }).waitFor();
await expect(page.getByRole('status')).toHaveText('Ready');
```

Use `waitForURL`, `waitForResponse`, or a visible state assertion when the
interaction depends on navigation or an API response. Avoid arbitrary
`waitForTimeout` calls; if a real animation or external event requires a
bounded wait, state the reason and the timeout.

Isolate a focused check with a fresh context where practical, and close pages,
contexts, and browsers in a `finally` block. Capture a screenshot, trace, or
sanitized console/network summary only when it helps explain a failure. Do not
capture page contents that could contain private data.

## Failure triage

When an interaction fails, record:

- route and environment classification, without credentials;
- locator and expected state;
- observed URL/title/role or sanitized status code;
- whether the failure is reproducible;
- the smallest next check and its acceptance condition.

Do not convert a successful click or process exit into proof that an API,
authorization boundary, data mutation, or production deployment worked. Those
claims require the appropriate authenticated or runtime evidence.

## Completion report

Return:

```text
TARGET
OBSERVED
EVIDENCE
NOT_RUN
BLOCKED_EXTERNAL
NEXT_CHECK
```

Use `PASS` only for the focused browser condition that was actually observed;
use `FAIL`, `NOT_RUN`, or `BLOCKED_EXTERNAL` when the evidence requires it.
