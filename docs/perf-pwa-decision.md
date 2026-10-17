# PWA decision — NO for now

The performance plan called for a PWA/SW decision. Recording it explicitly:

**Decision:** Do not add a Service Worker / PWA manifest in this cycle.

**Reasoning:**
- This is a static-export lead-generation site (calls, sign-ups, location info). Returning visitors get value mostly from seeing the latest hours, schedule, and prices.
- Adding a Service Worker introduces a real cache-invalidation problem on every Cloudflare deploy. Today the worker serves `Cache-Control: no-store` for HTML, so a new deploy is visible immediately. With a SW we would have to ship skipWaiting + clientsClaim logic and an explicit versioning strategy.
- A SW costs ~10-15 KB of JS plus the manifest, plus the work to keep the registration script in sync with the deployment fingerprint (`_build-info.json` already exists for this purpose, so the infrastructure is half there).
- Offline experience for a phone number + address is meaningless — if the user is offline, the call doesn't go through anyway.
- The "install prompt" / "Add to home screen" feature is not requested and not part of the business goals I have visibility into.

**When to revisit:**
- If the product wants push notifications (currently no).
- If the product wants an offline mode (e.g. video lessons cached for traveling users). Then revisit with a clear "what must work offline" list.
- If the SEO/brand team asks for "Add to Home Screen" prominence on iOS — that requires a manifest at minimum, not a full SW.

**What we DO have today that approximates a PWA:**
- `public/manifest.webmanifest` if present (not verified, may not exist).
- Apple touch icon and `theme-color` meta if present (not verified).
- HTTP cache layered at Cloudflare + browser for 1 year on hashed assets (Task 9) so repeat visits load the JS/CSS from cache.

Decision owner: Performance agent (this run), 2026-10-17.
