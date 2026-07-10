/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-cosmica)"],
      },
      colors: {
        background: "var(--color-obsidian)",
        foreground: "var(--color-snow)",
        primary: {
          DEFAULT: "#FF4202",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "var(--color-graphite)",
          foreground: "var(--color-ash)",
        },
        obsidian: "var(--color-obsidian)",
        ink: "var(--color-ink)",
        graphite: "var(--color-graphite)",
        slate: "var(--color-slate)",
        steel: "var(--color-steel)",
        ash: "var(--color-ash)",
        pebble: "var(--color-pebble)",
        fog: "var(--color-fog)",
        mist: "var(--color-mist)",
        snow: "var(--color-snow)",
        ember: "var(--color-ember)",
        orchid: "var(--color-orchid-flash)",
      },
      maxWidth: {
        page: "var(--page-max-width)",
      },
      borderRadius: {
        card: "var(--radius-card)",
        "card-compact": "var(--radius-card-compact)",
        hero: "var(--radius-hero)",
        pill: "var(--radius-pill)",
        badge: "var(--radius-badge)",
        xl: "0.75rem",
        "3xl": "1.5rem",
      },
      spacing: {
        25: "6.25rem",
        35: "8.75rem",
        68: "17rem",
      },
      size: {
        7.5: "1.875rem",
      },
      boxShadow: {
        pill: "var(--shadow-subtle)",
        card: "var(--shadow-md)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontSize: {
        caption: ["var(--text-caption)", { lineHeight: "var(--leading-caption)" }],
        body: ["var(--text-body)", { lineHeight: "var(--leading-body)" }],
        "body-lg": ["var(--text-body-lg)", { lineHeight: "var(--leading-body-lg)" }],
        subheading: ["var(--text-subheading)", { lineHeight: "var(--leading-subheading)" }],
        "heading-sm": ["var(--text-heading-sm)", { lineHeight: "var(--leading-heading-sm)" }],
        heading: ["var(--text-heading)", { lineHeight: "var(--leading-heading)" }],
        "heading-lg": ["var(--text-heading-lg)", { lineHeight: "var(--leading-heading-lg)" }],
        "display-sm": ["var(--text-display-sm)", { lineHeight: "var(--leading-display-sm)" }],
        display: ["var(--text-display)", { lineHeight: "var(--leading-display)" }],
      },
    },
  },
  plugins: [],
};
