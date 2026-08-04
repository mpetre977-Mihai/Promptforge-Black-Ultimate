/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0B0B0F",
        darkCard: "#12121A",
        accentPurple: "#8B5CF6",
        accentPurpleLight: "#A78BFA",
      },
    },
  },
  plugins: [],
}
