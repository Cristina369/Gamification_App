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
        primary: "#19376D",
        secondary: "#576CBC",
        third: "#A5D7E8",
        fourth: "#e5e7eb",
      },
    },
  },
  plugins: [],
};
