/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        vsm: "400px",
        xmd: "850px",
      },
      fontFamily: {
        JetbrainsMono: ["JetBrains Mono", "monospace"],
        Sec: ["Braah One", "sans-serif"],
      },
    },
  },
  plugins: [],
};
