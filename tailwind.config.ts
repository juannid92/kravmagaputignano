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
        // Palette Elegante - Krav Maga
        background: "#0A0A0A",
        surface: "#141414",
        surfaceAlt: "#1E1E1E",
        foreground: "#FFFFFF",
        foregroundMuted: "#A0A0A0",
        accent: "#CC0000",           // Rosso Ferrari
        accentHover: "#AA0000",
        gold: "#D4AF37",            // Oro
        goldSubtle: "rgba(212, 175, 55, 0.15)",
        danger: "#EF4444",
        border: "rgba(255, 255, 255, 0.08)",
        borderAccent: "rgba(204, 0, 0, 0.3)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        heading: ["var(--font-heading)", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(4rem, 12vw, 10rem)", { lineHeight: "0.9", letterSpacing: "0.02em" }],
        "display-lg": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "0.95", letterSpacing: "0.01em" }],
        "display-md": ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1", letterSpacing: "0.01em" }],
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
        glow: "0 0 40px rgba(204, 0, 0, 0.15)",
        "glow-sm": "0 0 20px rgba(204, 0, 0, 0.1)",
        "glow-gold": "0 0 30px rgba(212, 175, 55, 0.2)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(204, 0, 0, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(204, 0, 0, 0.4)" },
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
