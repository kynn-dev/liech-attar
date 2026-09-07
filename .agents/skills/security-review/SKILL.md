---
name: security-review
description: Use when conducting an evidence-backed security review of an application, change, service boundary, or deployment path, including authentication, authorization, tenant isolation, secrets, input/output handling, SSRF, XSS, injection, logging, dependencies, and deployment boundaries. Separate static evidence from runtime and production evidence; never recommend bypasses.
---

# Security review

Use this skill to identify security-relevant trust boundaries, abuse paths, and control gaps without weakening the controls under review. The result is a bounded threat model and evidence-backed findings, not a generic checklist, exploit exercise, or production change.

## Non-negotiable invariant

> Never recommend or perform a bypass of authentication, authorization, tenant isolation, validation, encryption, rate limiting, or deployment controls to make a review easier.

The letter of this rule is the spirit of the rule. An administrator token, disabled row-level security, permissive CORS, arbitrary outbound URL, logged credential, or suppressed validation is not evidence that a regular user flow is safe.

## When to use

Use for:

- A code, configuration, dependency, API, storage, database, or deployment-boundary review with security impact.
- Changes involving identity, sessions, roles, tenant or object access, secrets, untrusted input, output rendering, network fetches, logging, or CI/CD.
- A request to map threats, review controls, or distinguish a static finding from a runtime or production result.

Do not use as permission to exploit third-party systems, access data outside the authorized scope, rotate or reveal secrets, or modify production. If the required environment or account is unavailable, record that boundary and stop the affected runtime check.

## Start with a threat model

Before reviewing individual lines, establish:

- Assets: credentials, sessions, tenant data, personal data, business records, files, logs, build artifacts, and service credentials.
- Actors: anonymous users, authenticated users, other tenants, privileged operators, maintainers, service accounts, dependencies, and attackers.
- Entry points: HTTP routes, APIs, webhooks, jobs, queues, file uploads, imports, admin tools, scripts, and deployment pipelines.
- Trust boundaries: browser to server, tenant to tenant, user to operator, service to service, application to database, application to provider, and build to deployment.
- Security invariants: who may perform each action, what data each actor may access, what must never leave a boundary, and how failures must behave.
- Assumptions and unknowns: label them explicitly rather than treating architecture, provider behavior, or configuration as fact.

For each high-impact flow, write the abuse path in one sentence: actor, entry point, untrusted input or capability, control that should stop it, and impact if the control fails. Prioritize by impact, exploitability, exposure, and confidence in the evidence.

## Review workflow

### 1. Establish scope and evidence class

Record the exact files, routes, services, identities, environments, and deployment boundaries in scope. Inspect the current diff before broadening the review. Preserve unrelated worker changes and do not infer a security guarantee from a directory name or UI affordance.

Classify every conclusion as one of:

- STATIC — code, configuration, tests, dependency manifests, lockfiles, generated bundles, or diff evidence.
- CONTROLLED_RUNTIME — an authorized local, test, or sandbox flow with known identity and data scope.
- REMOTE_RUNTIME — an authorized staging or remote flow, with environment and identity recorded.
- PRODUCTION — an explicitly authorized production flow, with the exact path and identity recorded.
- UNKNOWN — evidence is insufficient; state what would resolve it.

Static evidence can reveal a missing check. It cannot prove production behavior, remote provider health, or that every role and tenant is isolated. A local runtime result cannot be promoted to production evidence.

### 2. Review authentication

Check the server-side identity boundary, not just the client:

- Credentials, tokens, sessions, refresh and revocation behavior, expiration, audience or issuer validation, and secure transport.
- Whether every protected entry point rejects missing, malformed, expired, or wrong-context identity.
- Whether identity comes from a verified server-side session or token rather than a user-supplied identifier, hidden field, header, or client state.
- Password reset, account recovery, MFA, session fixation, CSRF, replay, and logout behavior when applicable.
- Error and timing behavior that could disclose account existence or credential state.
- Service-to-service identity, webhook signatures, key rotation boundaries, and least-privilege credentials.

Do not suggest disabling a check, accepting an unsigned token, trusting a client claim, or using a privileged credential to “test” authentication. If a valid test session is unavailable, the authenticated runtime check is NOT_RUN or BLOCKED_EXTERNAL, not PASS.

### 3. Review authorization

Verify authorization at the server or policy boundary for every sensitive operation:

- Function-level permission: can the actor invoke the operation?
- Object-level permission: can the actor access this exact record, file, job, or endpoint?
- Property-level permission: can the actor read or mutate each returned or submitted field?
- Role and privilege transitions: are escalation, delegation, impersonation, and administrative actions protected?
- Default behavior: does a missing or ambiguous policy fail closed?
- Background jobs, exports, caches, webhooks, direct object URLs, and alternate API versions: do they enforce the same boundary?

UI hiding, route guards, disabled buttons, and client-side role checks are ergonomics, not authorization. Record them as usability controls only.

### 4. Review tenant and object isolation

Where a tenant or workspace model exists:

- Derive tenant context from verified server-side identity and membership, never from an untrusted request field alone.
- Scope every read, write, update, delete, search, export, file path, cache key, job, notification, and realtime subscription to the authorized tenant and object.
- Review database policies, RPCs, repository queries, joins, bulk operations, storage rules, and fallback paths.
- Check that identifiers from one tenant cannot be used as an alternate lookup path into another tenant.
- Verify create, update, delete, restore, import, and administrative flows, not only list and detail pages.
- Check isolation in errors, counts, autocomplete, analytics, logs, backups, and generated artifacts.

Use dedicated test identities and synthetic records for cross-tenant negative checks. Never use another person’s data or a production administrator path as proof. If the tenant model is unclear, report the unknown rather than assuming isolation.

### 5. Review secrets and sensitive data

Search for exposure in source, history where authorized, configuration, logs, error payloads, client bundles, artifacts, screenshots, fixtures, and dependency metadata without printing values. Check:

- Secret names and loading boundaries, public versus server-only configuration, and accidental client bundling.
- Logs, traces, analytics, crash reports, URLs, referrers, cache keys, and error messages.
- Encryption and transport expectations for sensitive data, retention, access, and deletion boundaries.
- CI/CD variables, build output, deployment manifests, container layers, and generated files.
- Test fixtures and examples that may look synthetic but contain real credentials or personal data.

Report the secret type, location, and exposure class, not the value. Do not copy a secret into a report, rotate it without explicit authorization, or recommend logging it to aid debugging.

### 6. Review input and output handling

Trace untrusted data from each entry point to storage, queries, commands, templates, redirects, network clients, and responses. Check:

- Schema validation, type and size limits, canonicalization, allowlists, and safe handling of missing or duplicate fields.
- SQL, NoSQL, ORM, shell, template, expression, GraphQL, path, header, and deserialization injection boundaries.
- HTML, URL, JavaScript, CSS, CSV, JSON, Markdown, and document output encoding in the correct context.
- File upload type, size, content, filename, storage, download headers, malware handling, and path traversal.
- Safe error responses that do not reveal stack traces, secrets, internal identifiers, or policy details.
- Request smuggling, parser differentials, prototype pollution, open redirects, and unsafe redirects where relevant.

Validation is not a substitute for parameterization or contextual output encoding. Escaping is not a substitute for authorization.

### 7. Review SSRF and outbound requests

For every user-influenced URL, host, callback, import, preview, webhook, or redirect:

- Use a strict scheme and host allowlist appropriate to the feature.
- Resolve and validate the destination before connecting, and account for redirects, DNS rebinding, alternate IP forms, link-local and private ranges, metadata endpoints, and IPv6 representations.
- Enforce timeouts, response-size limits, content-type expectations, redirect limits, and egress policy.
- Prevent credentials, internal headers, cookies, or authorization context from crossing to an untrusted destination.
- Log safe request metadata without storing sensitive response bodies.

Do not “fix” SSRF by allowing every URL, disabling certificate validation, routing through a privileged proxy, or accepting arbitrary redirects. If the provider or network is unavailable, review the boundary statically and mark the live check accordingly.

### 8. Review logging and observability

Check that security events are useful without becoming a data-exfiltration path:

- Authentication failures, authorization denials, privilege changes, secret access, suspicious input, and relevant administrative actions are attributable and timestamped.
- Tokens, passwords, session identifiers, private keys, full personal data, and sensitive request or response bodies are not logged.
- User-controlled log fields are structured or safely encoded to prevent log injection.
- Correlation identifiers do not become authorization capabilities.
- Retention, access, redaction, alerting, and incident-response ownership are defined for the environment.
- Failure handling does not suppress security events or leak internal details to the caller.

### 9. Review dependencies and supply chain

Inspect manifests, lockfiles, registries, build scripts, plugins, generated code, and update policy:

- Known vulnerable or abandoned dependencies and their reachable use.
- Lockfile integrity, unexpected transitive changes, install scripts, postinstall behavior, and artifact provenance.
- Whether a proposed upgrade is necessary, bounded, and tested.
- Build and CI permissions, dependency source trust, and secret exposure to untrusted build steps.

Use configured advisory or static tools when available, but do not treat a clean scanner as proof of application authorization or runtime safety. Do not upgrade dependencies blindly just to remove a warning outside the request.

### 10. Review deployment boundaries

Check the path from source to the running environment:

- Environment and project separation, least-privilege service accounts, network ingress and egress, CORS, CSRF, security headers, TLS, and debug settings.
- Which configuration is public, server-only, build-time, runtime, or inherited from the platform.
- CI/CD triggers, protected branches, artifact provenance, approval boundaries, secret scopes, and rollback behavior.
- Database migrations, policy changes, storage permissions, queues, caches, and background workers as separate deployment risks.
- Preview, staging, and production differences that could hide an authorization or secret exposure.

Do not deploy, change production policy, widen network access, disable protections, or apply a migration as part of a review unless that exact action is explicitly authorized. A deployment file inspection remains STATIC evidence.

## Findings format

For each finding, record:

- Severity and confidence, with the reason for both.
- Asset, actor, entry point, trust boundary, and abuse path.
- Evidence class and exact file, symbol, configuration boundary, test, or authorized runtime observation.
- Preconditions, impact, affected scope, and whether exploitability is demonstrated or inferred.
- Smallest safe remediation, preserving existing authorization and privacy boundaries.
- Validation command or test, expected result, actual status, and remaining limits.

Use PASS, FAIL, NOT_RUN, or BLOCKED_EXTERNAL for the validation status of each finding or control. Do not call a control effective when its required runtime or production evidence was not available.

## Safe verification boundaries

- Use synthetic data and dedicated accounts for runtime checks.
- Test both allowed and denied paths without bypassing the control being reviewed.
- Prefer read-only, reversible, rate-bounded probes in an authorized environment.
- Stop before destructive actions, privilege changes, cross-tenant data access, exploit payloads against third parties, or production mutations.
- Sanitize output and retain only the minimum evidence needed to reproduce the reasoning.
- If a required session, provider, network, permission, or deployment artifact is unavailable, classify the gap as NOT_RUN or BLOCKED_EXTERNAL and state the smallest safe unblock.

## Red flags: stop and reject the shortcut

- “Use an admin token to prove the regular user path.”
- “Disable RLS, authorization, TLS, validation, or rate limiting temporarily.”
- “Allow all origins or all URLs for now.”
- “Log the token or full payload so we can see what happened.”
- “The UI hides it, so authorization is covered.”
- “The static scan is clean, so production is secure.”
- “A local anonymous request proves the authenticated route.”
- “Upgrade everything” without a bounded dependency finding and regression plan.

## Reusable checklist

- [ ] Assets, actors, entry points, trust boundaries, and invariants are explicit.
- [ ] Authentication and server-side authorization were reviewed separately.
- [ ] Object, property, function, and tenant isolation were traced across alternate paths.
- [ ] Secrets and sensitive data were checked without exposing values.
- [ ] Input validation, output encoding, injection, upload, and error paths were reviewed.
- [ ] SSRF and outbound-request restrictions were reviewed where applicable.
- [ ] Logging and observability avoid sensitive data and log injection.
- [ ] Dependencies, lockfiles, build steps, and deployment boundaries were reviewed.
- [ ] Static, controlled runtime, remote, and production evidence are separated.
- [ ] Every required check is PASS, FAIL, NOT_RUN, or BLOCKED_EXTERNAL.
- [ ] No bypass, unauthorized access, production mutation, or secret exposure was recommended.
