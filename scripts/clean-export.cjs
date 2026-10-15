const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
// Only generated directories beneath this repository, never source/public.
for (const directory of ["out", ".next"]) {
  fs.rmSync(path.join(root, directory), { recursive: true, force: true });
}
console.log("[build] Removed generated out/ and .next/ before compilation.");
