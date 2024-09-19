/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    // customized breakpoints //
    screens: {
      smallscreen: "300px",
      mobile: "600px",
      tablet: "760px",
      laptop: "1024px",
      desktop: "1280px",
      lgdesk: "1600px",
    },
    extend: {},
  },
  darkMode: 'media', // Add this line to enable dark mode based on system preferences
  plugins: [require("tailwind-scrollbar") ({ nocompatible: true })],
};
