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
            "blue-sapphire": "#05668D",
            "metalic-seaweed": "#028090",
            "persian-green": "#00A896",
            "mountain-meadow": "#02C39A",
            "pale-spring-bud": "#F0F3BD"
        }
    },
  },
  plugins: [],
}

