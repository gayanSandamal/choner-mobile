// tailwind.config.js

module.exports = {
  content: [
    './components/**/*.{js,jsx,ts,tsx}',
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      spacing: {
        '112': '28rem',
        '128': '32rem',
      }
    },
    colors: {
      grey: '#001827',
    }
  },
  plugins: [],
}