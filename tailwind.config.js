module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 24px 80px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#ddefff',
          500: '#2467ff',
          700: '#1f4fd7',
        },
      },
    },
  },
  plugins: [],
};
