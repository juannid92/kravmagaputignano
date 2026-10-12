// GSAP Plugin Registration
// Register all GSAP plugins in one place
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register plugins globally
gsap.registerPlugin(ScrollTrigger, SplitText);

// Configure ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
});

export { gsap, ScrollTrigger, SplitText };
