import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Tattica - Kras Maga
        background: "#08080A",
        surface: "#111114",
        surfaceAlt: "#1A1A1D",
        foreground: "#F5F5F3",
        foregroundMuted: "#9A9A97",
        accent: "#F59E0B",      // Ambra - riferimento Israele
        accentDark: "#D97706",
        danger: "#EF4444",
        border: "rgba(245, 245, 243, 0.08)",
        borderAccent: "rgba(245, 158, 11, 0.3)",
      },
      fontFamily: {
        display: ["var(--font-bebas-neue)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(4rem, 12vw, 10rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "section": "8rem",
        "section-sm": "5rem",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
      },
      boxShadow: {
        glow: "0 0 40px rgba(245, 158, 11, 0.15)",
        "glow-sm": "0 0 20px rgba(245, 158, 11, 0.1)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245, 158, 11, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(245, 158, 11, 0.4)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
