// postcss.config.js
// Esto es correcto para Tailwind CSS v4
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // ¡Este es el plugin correcto para v4!
    autoprefixer: {},
  },
};

module.exports = config;