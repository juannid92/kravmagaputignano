// Serve only the assets bound to this deployment. Never fall back to a remote
// origin or a manually cached copy of an earlier index.html.
// Static asset responses may ignore Range. Safari needs byte-range responses to
// seek and play video reliably. Keep only the requested bytes without buffering
// the complete file when the asset binding provides its length.
function byteRange(value, length) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(value.trim());
  if (!match || (!match[1] && !match[2])) return null;
  let start, end;
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!Number.isSafeInteger(suffix) || suffix <= 0 || length === 0) return false;
    start = Math.max(0, length - suffix);
    end = length - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : length - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= length || start > end) return false;
    end = Math.min(end, length - 1);
  }
  return { start, end };
}

function sliceStream(body, start, end) {
  const reader = body.getReader();
  let offset = 0;
  return new ReadableStream({
    async pull(controller) {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) { controller.close(); return; }
          const chunkStart = offset;
          offset += value.byteLength;
          const from = Math.max(0, start - chunkStart);
          const to = Math.min(value.byteLength, end + 1 - chunkStart);
          if (to > from) controller.enqueue(value.subarray(from, to));
          if (offset > end) {
            controller.close();
            void reader.cancel();
            return;
          }
          if (to > from) return;
        }
      } catch (error) { controller.error(error); }
    },
    cancel(reason) { return reader.cancel(reason); },
  });
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    const isVideo = path.startsWith("/videos/") && path.endsWith(".mp4");
    const rangeValue = isVideo && request.method === "GET" ? request.headers.get("Range") : null;
    // Obtain the complete asset first so its length is known even if the
    // binding does not implement Range itself.
    let assetRequest = request;
    if (rangeValue) {
      const assetHeaders = new Headers(request.headers);
      for (const name of ["Range", "If-Range", "If-None-Match", "If-Modified-Since"]) assetHeaders.delete(name);
      assetRequest = new Request(request, { headers: assetHeaders });
    }
    const response = await env.ASSETS.fetch(assetRequest);
    const headers = new Headers(response.headers);
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
    //   Videos → no-store, so a partial request cannot hit an old cached 200.
    //   Everything else (sitemap.xml, robots.txt, /images/*) →
    //   1 hour with must-revalidate: short enough that a content change
    //   propagates within the hour, long enough to absorb bursts.
    if (isHtml || isBuildInfo) {
      headers.set("Cache-Control", "no-store");
      headers.set("CDN-Cache-Control", "no-store");
      headers.set("Cloudflare-CDN-Cache-Control", "no-store");
    } else if (isVideo) {
      // Avoid reusing a previously cached 200 response for a range request.
      headers.set("Cache-Control", "no-store");
      headers.set("CDN-Cache-Control", "no-store");
      headers.set("Cloudflare-CDN-Cache-Control", "no-store");
      headers.set("Accept-Ranges", "bytes");
    } else if (path.startsWith("/_next/static/")) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      headers.set("Cache-Control", "public, max-age=3600, must-revalidate");
    }

    if (rangeValue && response.status === 200 && response.body) {
      const ifRange = request.headers.get("If-Range");
      const rangeAllowed = !ifRange || ifRange === headers.get("ETag") || ifRange === headers.get("Last-Modified");
      if (rangeAllowed) {
        let body = response.body;
        let length = Number(headers.get("Content-Length"));
        if (!headers.has("Content-Length") || !Number.isSafeInteger(length) || length < 0) {
          const bytes = new Uint8Array(await response.arrayBuffer());
          length = bytes.byteLength;
          body = new ReadableStream({ start(controller) { controller.enqueue(bytes); controller.close(); } });
        }
        const range = byteRange(rangeValue, length);
        if (range === false) {
          void body.cancel();
          headers.set("Content-Range", `bytes */${length}`);
          headers.delete("Content-Length");
          return new Response(null, { status: 416, headers });
        }
        if (range) {
          headers.set("Content-Range", `bytes ${range.start}-${range.end}/${length}`);
          headers.set("Content-Length", String(range.end - range.start + 1));
          return new Response(sliceStream(body, range.start, range.end), { status: 206, headers });
        }
        // Malformed or multi-range headers are ignored, as allowed by HTTP.
        return new Response(body, { status: response.status, statusText: response.statusText, headers });
      }
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
