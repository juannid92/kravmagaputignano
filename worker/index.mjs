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
    // Keep hashed JS/CSS cacheable, but never reuse an HTML document or
    // diagnostic manifest from a different deployment.
    if (isHtml || isBuildInfo) {
      headers.set("Cache-Control", "no-store");
      headers.set("CDN-Cache-Control", "no-store");
      headers.set("Cloudflare-CDN-Cache-Control", "no-store");
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
