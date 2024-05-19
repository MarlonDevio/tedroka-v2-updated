/** @type {import('tailwindcss').Config} */

module.exports = {
  // tailwind.config.js
  safelist: [
    "bg-gray-darkest",
    "bg-gray-darker",
    "bg-gray-medium",
    "bg-gray-light",
    // Add more classes as necessary
  ],
  // rest of the config

  content: [
    "./layout/*.liquid",
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./templates/*.liquid",
    "./templates/customers/*.liquid",
    "./assets/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#ef2e30",
        "gray-darker": "#46484E",
        "gray-medium": "#4f5055",
        "gray-light": "#98999E",
        "gray-darkest": "#0D0D0D",
      },
      fontSize: {
        "heading-1": "4rem",
        "heading-2": "3.25rem",

        // product title in products grid
        "heading-3": "1.87rem",
        "body-1": "2rem",

        // Tedroka in products grid
        "body-2": "1.5rem",
        "body-3": "1.375rem",

        // Description
        "body-4": "1.125rem",
      },
      fontFamily: {
        sansation: ["Sansation", "sans-serif"],
        sen: ["Sen", "sans-serif"],
      },
      screens: {
        "small-mobile": "320px",
        mobile: "480px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
        "large-desktop": "1440px",
      },
      backgroundImage: {
        "hero-pattern": 'url("/assets/header-background.png")',
      },
    },
    height: {
      94: "22rem",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
