module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mush: "#1c2a38",
      },
      margin: {
        "1/10": "10%",
      },
    },
  },
  plugins: [],
};
