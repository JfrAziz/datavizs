/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "primary": "var(--mantine-color-primary)",
        "anchor": "var(--mantine-color-anchor)",
        "text": "var(--mantine-color-text)",
        "body": "var(--mantine-color-body)",
        "neutral": "var(--mantine-color-neutral)",
        "neutral-hover": "var(--mantine-color-neutral-hover)",
        "neutral-color": "var(--mantine-color-neutral-color)",
        "neutral-border": "var(--mantine-color-neutral-border)",
      },
    },
  },
  plugins: [],
}
