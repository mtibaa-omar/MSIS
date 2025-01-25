/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-200": "#f9fafb",
        "primary-100": "#fff",
        "dark-primary-200": "#1f2937",
        "dark-primary-100": "#374151",
        customBg: "#3b82f6",
      },
    },
  },
  plugins: [],
};
