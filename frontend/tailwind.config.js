/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-bluegray": "#334155",
      },
      keyframes: {
        swing: {
          "0%": { transform: "rotate(3deg)" },
          "100%": { transform: "rotate(-3deg)" },
        },
      },
      animation: {
        swing: "swing ease-in-out 1s infinite alternate",
      },
    },
  },
  plugins: [],
};
