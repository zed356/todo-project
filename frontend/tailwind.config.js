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
        loadingSpinner1: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        loadingSpinner2: {
          "0%": { transform: "translate(0,0)" },
          "100%": { transform: "translate(24px, 0)" },
        },
        loadingSpinner3: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
      },
      animation: {
        swing: "swing ease-in-out 1s infinite alternate",
        loadingSpinner1: "loadingSpinner1  0.6s infinite",
        loadingSpinner2: "loadingSpinner2  0.6s infinite",
        loadingSpinner3: "loadingSpinner3  0.6s infinite",
      },
    },
  },
  plugins: [],
};
