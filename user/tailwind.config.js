/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: "300px",
      tablet: "750px",
      desktop: "1200px",
    },
    extend: {
      colors: {
        primary: "#125755",
        secondary: "#57b07c",
        third: "#dae890",
        fourth: "#e5e7eb",
      },
    },
  },
  plugins: [],
};
