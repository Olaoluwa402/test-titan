/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark50: "#6C6C6C",
        dark100: "#9A9EA6",
        dark200: "#9FA4AE",
        dark: "#000000",
        dark200: "#696969",
        light: "#FFFFFF",

        light100: "#F6F5F5",
        titaniumOrange: "#FF7A00",
        titaniumOrange200: "#FFEAD8",
        titaniumSilver: "#BEBDC2",
        titaniumDarkBlue100: "#0A1637",
        titaniumDarkBlue200: "#141D32",
        blueShade500: "#141D32",
        titaniumGray20: "#EFEFEF",
        titaniumGray30: " #C5C5C5",
        titaniumGray40: "rgba(242, 242, 242, 0.5)",
        platinumGradient:
          "linear-gradient(94.71deg, #C5D6FF 3.22%, rgba(173, 188, 224, 0.47) 102.48%)",
        goldGradient:
          "linear-gradient(89.88deg, #DD9738 -7.12%, rgba(236, 188, 54, 0.92) 114.41%)",
        shadowDark: "0px 4px 67px rgba(0, 0, 0, 0.12)",
      },
      fontFamily: {
        Jakarta: ["Plus Jakarta Sans", "sans-serif"],
        Urbanist: ["Urbanist", "sans-serif"],
      },
    },
  },
  plugins: [],
};
