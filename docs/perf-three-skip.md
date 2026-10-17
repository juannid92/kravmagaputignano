# three.js removal — SKIPPED

The performance plan's premise ("`three` is declared in package.json but never imported") is incorrect for this codebase.

Two components actively use `three` to render WebGL post-processing effects:
- `src/components/Percorsi.tsx` — `EffectComposer` + custom `ColorMatrixShader` for tinting/duotone the Percorsi cover image.
- `src/components/VideoShowcase.tsx` — `EffectComposer` with `UnrealBloomPass`, `FilmPass`, `GammaCorrectionShader`, scanline shader, etc., for the video showcase.

A `grep -rE "from 'three'" src/` returns 13 hits across those two files. Removing the dependency would break the build and removing the components' WebGL pipeline would change the visual output the user is paying for.

Recommendation for a follow-up plan:
- Decide whether the WebGL effects are worth their ~600 KB of gzipped JS (the audit table pegged `three` at 23 MB on-disk). If yes, accept that `three` is a real dependency and stop listing it as "dead".
- If no, port `Percorsi.tsx` and `VideoShowcase.tsx` to CSS filters / canvas-free effects and then drop the dep. That port is non-trivial and is a separate task.

In the meantime, `package.json` keeps `three` and `@types/three` so the production bundle still builds. No code change.
