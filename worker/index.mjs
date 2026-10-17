// Serve only the assets bound to this deployment. Never fall back to a remote
// origin or a manually cached copy of an earlier index.html.
export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    const path = new URL(request.url).pathname;
    const isHtml = (headers.get("content-type") || "").includes("text/html");
    const isBuildInfo = path === "/_build-info.json";

    headers.set("X-Site-Release", "scroll-parity-v2");
    if (env.CF_VERSION_METADATA?.id) {
      headers.set("X-Worker-Version", env.CF_VERSION_METADATA.id);
    }

    // Cache policy:
    //   Hashed Next assets (_next/static/*) and any fingerprinted file
    //   (chunk-<hash>.js, media/<hash>.woff2) → 1 year, immutable.
    //   HTML documents and the build-info manifest → no-store, so a deploy
    //   can never serve a stale page to a returning visitor.
    //   Everything else (sitemap.xml, robots.txt, /images/*, /videos/*) →
    //   1 hour with must-revalidate: short enough that a content change
    //   propagates within the hour, long enough to absorb bursts.
    if (isHtml || isBuildInfo) {
      headers.set("Cache-Control", "no-store");
      headers.set("CDN-Cache-Control", "no-store");
      headers.set("Cloudflare-CDN-Cache-Control", "no-store");
    } else if (path.startsWith("/_next/static/")) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
