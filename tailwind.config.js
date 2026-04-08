/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magpie: {
          primary: '#00338D', // Corporate Deep Blue
          dark: '#001b4c',    // Darker variant for footers
          light: '#0059b3',   // Lighter active states
          lighter: '#e6ebf3', // Very light background
          accent: '#FF3366',  // Red Accent from Figma
          hover: '#00266e'    // Hover state
        },
        navy: { 50:'#eef3fb', 100:'#d5e1f5', 300:'#7aa4df', 600:'#1d4ed8', 700:'#1a3fa8', 800:'#152e80', 900:'#0f1f5c' },
        jade: { 400:'#34c77b', 500:'#22a865', 600:'#1a8f52' },
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
