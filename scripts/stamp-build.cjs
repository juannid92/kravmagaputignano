const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const out = path.join(root, "out");
const html = fs.readFileSync(path.join(out, "index.html"), "utf8");
if (!html.includes('data-testid="nonsport"') || !html.includes('data-testid="gallery-track"')) {
  throw new Error("Build rejected: the exported HTML is missing the current scroll components.");
}
const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match => match[1]);
const pageAssets = scripts.filter(src => /\/app\/page-[^/]+\.js$/.test(src));
const walk = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(directory, entry.name);
  return entry.isDirectory() ? walk(file) : entry.name.endsWith(".js") ? [file] : [];
});
const bundle = walk(path.join(out, "_next", "static")).map(file => fs.readFileSync(file, "utf8")).join("\n");
for (const marker of ["nonsport-sequence", "gallery-horizontal"]) {
  if (!bundle.includes(marker)) throw new Error(`Build rejected: missing controller ${marker}`);
}
let commit = process.env.WORKERS_CI_COMMIT_SHA || process.env.GITHUB_SHA;
if (!commit) {
  try { commit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim(); }
  catch { commit = "local"; }
}
if (!/^[a-f0-9]{40}$/i.test(commit)) commit = "local";
const info = { release: "scroll-parity-v2", commit, builtAt: new Date().toISOString(), pageAssets };
fs.writeFileSync(path.join(out, "_build-info.json"), JSON.stringify(info, null, 2) + "\n");
console.log("[build] Verified scroll controllers and HTML. Deployment fingerprint:");
console.log(JSON.stringify(info, null, 2));
