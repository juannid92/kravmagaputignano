# Scroll regression tests

These tests serve the production `out/` static export, not the development server.

```sh
npm ci
npx playwright install chromium
npm run test:scroll
```

On Linux, browser dependencies may require `npx playwright install --with-deps chromium`.
An existing system Chromium can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE`.

Coverage: desktop 1440×900, touch 390×844 / 360×800, landscape 844×390,
01 → 02 → 03 and reverse, readable panel bounds, horizontal gallery travel
through the last image and release, resize, reduced motion and restored motion,
unique section numbering, horizontal overflow and uncaught browser errors.
Screenshots are generated under `test-results/` and are not committed.

Touch emulation in Chromium is not a substitute for testing physical Safari/iOS.
Reduced motion deliberately exposes the three panels in normal flow and wraps
the gallery; normal touch devices retain the desktop scroll-story behavior.
