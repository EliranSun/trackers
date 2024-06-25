/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        backgroundColor: {
            gray: {
                900: "#282c34"
                }
            }
    },
  },
  plugins: [],
}

