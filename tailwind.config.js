/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customContentBg: "#313230", // primary content area bg color
        customBg: "#151717", // primary bgh color
        customSecondary: "#B69792", // primary secondary color, mainly used for hover and as a combo color
        customHeaderOne: "#5A534E",
        customHeaderTwo: "#A29FA0",
        customHeaderThree: "#B4B5B9",
        customTxtContent: "#F5F5F5",
      },
      boxShadow: {
        customBlockShadow:
          "0px 4px 8px -2px rgba(23, 23, 23, 0.10), 0px 2px 4px -2px rgba(23, 23, 23, 0.06)",
        customBlockShadowHover:
          "0px 10px 15px -3px rgba(23, 23, 23, 0.15), 6px 8px 10px -2px rgba(23, 23, 23, 0.10)",
      },
    },
  },
  plugins: [],
};
