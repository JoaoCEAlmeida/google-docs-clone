module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      "80vh": "80vh",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
