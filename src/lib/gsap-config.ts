// GSAP + plugin bundle.
//
// Two ways to use this module:
//   1) Static: `import { gsap, ScrollTrigger } from "@/lib/gsap-config"`
//      Same behavior as `import from "gsap"` plus the plugins are registered.
//   2) Dynamic: `const bundle = await getGsap()`
//      Use this inside client effects to defer the gsap+ScrollTrigger
//      modules to after the initial paint (used by LenisProvider / ScrollProgress).
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;
function registerAll() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  ScrollTrigger.defaults({ toggleActions: "play none none reverse" });
  registered = true;
}
registerAll();

export { gsap, ScrollTrigger, SplitText };

// ----- Dynamic loader -----
// Returns the same instances as the static exports but is safe to await from
// inside a client effect; the underlying `gsap` import is already preloaded
// when this module is first imported, so the dynamic path is a no-op on the
// client (still null on the server).
type GsapBundle = {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  SplitText: typeof SplitText;
};
let _bundle: GsapBundle | null = null;
export async function getGsap(): Promise<GsapBundle | null> {
  if (typeof window === "undefined") return null;
  if (_bundle) return _bundle;
  _bundle = { gsap, ScrollTrigger, SplitText };
  return _bundle;
}
