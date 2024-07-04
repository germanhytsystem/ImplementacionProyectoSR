/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "././pages/**/*.{html,js}",
    "././components/**/*.{html,js}",
    "././core/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-light": "#F6F7F8",
        "secondary-light": "#BCB8B8",

        "primary-dark": "#0F1D4F",
        "secondary-dark": "#070707",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "5rem",
          xl: "6rem",
          "2xl": "8rem",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  customUtilities: {},
  plugins: [],
};
