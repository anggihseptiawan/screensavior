/** @type {import('tailwindcss').Config} */
export default {
  darkMode: [
    "variant",
    ["@media (prefers-color-scheme: dark) { &:not(.light *) }"],
  ],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [],
}
