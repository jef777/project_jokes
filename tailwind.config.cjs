const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    darkMode: ['class', '[data-mode="dark"]'], // 'class' enables class-based dark mode
  },
  plugins: [],
});
