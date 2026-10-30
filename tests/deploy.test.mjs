import test from "node:test";
import assert from "node:assert/strict";
import worker from "../worker/index.mjs";
import fs from "node:fs";

const envFor = response => ({ ASSETS: { fetch: async () => response }, CF_VERSION_METADATA: { id: "test-version" } });

test("HTML is served from the bound assets and cannot be cached as an old document", async () => {
  const result = await worker.fetch(new Request("https://example.com/"), envFor(new Response("<h1>Current build</h1>", { headers: { "Content-Type": "text/html", "Cache-Control": "public, max-age=3600" } })));
  assert.equal(await result.text(), "<h1>Current build</h1>");
  for (const name of ["Cache-Control", "CDN-Cache-Control", "Cloudflare-CDN-Cache-Control"]) assert.equal(result.headers.get(name), "no-store");
  assert.equal(result.headers.get("X-Worker-Version"), "test-version");
  assert.equal(result.headers.get("X-Site-Release"), "scroll-parity-v2");
});
test("hashed JS retains its original immutable caching", async () => {
  const result = await worker.fetch(new Request("https://example.com/_next/static/chunks/app/page-current.js"), envFor(new Response("current", { headers: { "Content-Type": "text/javascript", "Cache-Control": "public, max-age=31536000, immutable" } })));
  assert.equal(result.headers.get("Cache-Control"), "public, max-age=31536000, immutable");
  assert.equal(await result.text(), "current");
});
test("build manifest is not cached", async () => {
  const result = await worker.fetch(new Request("https://example.com/_build-info.json"), envFor(Response.json({ commit: "current" })));
  assert.equal(result.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await result.json(), { commit: "current" });
});
test("missing asset stays 404 instead of falling back to an old page", async () => {
  const result = await worker.fetch(new Request("https://example.com/missing.js"), envFor(new Response("Missing", { status: 404 })));
  assert.equal(result.status, 404);
});
test("asset redirects and status codes are preserved", async () => {
  const result = await worker.fetch(new Request("https://example.com/index.html"), envFor(new Response(null, { status: 307, headers: { Location: "/" } })));
  assert.equal(result.status, 307);
  assert.equal(result.headers.get("Location"), "/");
});
test("production export is fingerprinted and contains the expected HTML", () => {
  const info = JSON.parse(fs.readFileSync(new URL("../out/_build-info.json", import.meta.url), "utf8"));
  assert.equal(info.release, "scroll-parity-v2");
  assert.ok(info.pageAssets.length > 0);
  const html = fs.readFileSync(new URL("../out/index.html", import.meta.url), "utf8");
  assert.ok(html.includes('data-testid="nonsport"'));
  assert.ok(html.includes('data-testid="gallery-track"'));
});

const videoBytes = Uint8Array.from({ length: 32 }, (_, i) => i);
function videoEnv({ withLength = true, status = 200 } = {}) {
  return { ASSETS: { fetch: async request => {
    assert.equal(request.headers.get('range'), null);
    const headers = { 'Content-Type': 'video/mp4', 'ETag': '"clip"' };
    if (withLength) headers['Content-Length'] = String(videoBytes.length);
    return new Response(videoBytes, { status, headers });
  } } };
}
async function rangeRequest(range, opts = {}, extraHeaders = {}) {
  return worker.fetch(new Request('https://example.com/videos/showcase/showcase-5.mp4?v=test', { headers: { Range: range, ...extraHeaders } }), videoEnv(opts));
}
for (const [range, start, end] of [['bytes=0-1', 0, 1], ['bytes=5-12', 5, 12], ['bytes=26-', 26, 31], ['bytes=-6', 26, 31], ['bytes=28-500', 28, 31]]) {
  test(`video byte range ${range}`, async () => {
    const result = await rangeRequest(range);
    assert.equal(result.status, 206);
    assert.equal(result.headers.get('Content-Range'), `bytes ${start}-${end}/32`);
    assert.equal(result.headers.get('Content-Length'), String(end - start + 1));
    assert.equal(result.headers.get('Accept-Ranges'), 'bytes');
    assert.equal(result.headers.get('CDN-Cache-Control'), 'no-store');
    assert.deepEqual(new Uint8Array(await result.arrayBuffer()), videoBytes.slice(start, end + 1));
  });
}
test('video ranges work without upstream content length', async () => {
  const result = await rangeRequest('bytes=3-8', { withLength: false });
  assert.equal(result.status, 206);
  assert.deepEqual(new Uint8Array(await result.arrayBuffer()), videoBytes.slice(3, 9));
});
test('unsatisfiable video range is 416', async () => {
  const result = await rangeRequest('bytes=32-');
  assert.equal(result.status, 416);
  assert.equal(result.headers.get('Content-Range'), 'bytes */32');
});
test('unsupported multipart range returns the complete video', async () => {
  const result = await rangeRequest('bytes=0-1,4-6');
  assert.equal(result.status, 200);
  assert.deepEqual(new Uint8Array(await result.arrayBuffer()), videoBytes);
});
test('if-range mismatch returns the complete video', async () => {
  const result = await rangeRequest('bytes=0-1', {}, { 'If-Range': '"old"' });
  assert.equal(result.status, 200);
  assert.deepEqual(new Uint8Array(await result.arrayBuffer()), videoBytes);
});
