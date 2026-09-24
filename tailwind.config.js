/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0F0C",
        surface: "#15170F",
        card: "#191B13",
        border: "#2A2D22",
        muted: "#8C9083",
        bone: "#F3F5EC",
        acid: "#CCFF00",
        acidDim: "#A8D400",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "4px",
      },
    },
  },
  plugins: [],
};
