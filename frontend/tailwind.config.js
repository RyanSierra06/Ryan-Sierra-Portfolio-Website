const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@heroui/theme/dist/components/(accordion|button|divider|ripple|spinner).js"
  ],
    theme: {
        extend: {},
    },
  plugins: [heroui()],
};
