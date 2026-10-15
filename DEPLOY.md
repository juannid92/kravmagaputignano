# Cloudflare publication

The repository explicitly configures the `kravmagaputignano` Worker in
`wrangler.jsonc`. It serves this deployment's `out/` assets through the ASSETS
binding; it does not fetch the site from a remote origin.

Existing dashboard settings remain compatible:

- Build: `npm run build`
- Deploy: `npx wrangler deploy --assets ./out --name kravmagaputignano --compatibility-date 2026-10-12`
- Production branch: `master`

The build removes only generated `out/` and `.next/`, compiles the current
source and rejects an export missing the NonSport/gallery controllers. It
writes `out/_build-info.json` with the CI commit SHA, build time and actual page
bundle path. No credentials are read or exported into this file.

After deployment, check `https://kravmagaputignano.metalferrshop.workers.dev/_build-info.json`.
The reported commit must equal the deployed GitHub commit. Fetch the listed
page bundle: it must return 200, and the HTML must reference that bundle.
Responses include `X-Site-Release: scroll-parity-v2` and `X-Worker-Version`.
HTML and the build manifest are no-store; hashed JS/CSS retain normal caching.

Do not consider a green build alone proof that the public URL is up to date.
If the manifest/header is missing, the requested URL is not serving this
Worker configuration. Investigate the deployment/routing rather than rewriting
animations again.

## Local verification

```sh
npm ci
npm run build
npm run test:deploy
npx wrangler deploy --dry-run
npx wrangler dev --local --port 4180
```

In another terminal, to test the actual local Worker instead of a generic
static server:

```sh
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4180 npx playwright test
```

Browser installation is described in `tests/README.md`. These local tests
cannot prove which version a remote account currently routes to a public URL.
