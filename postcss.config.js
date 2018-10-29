module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    autoprefixer: {
      browsers: ['last 2 versions', 'ie >= 11'],
      flexbox: 'no-2009',
    },
    cssnano: {
      preset: 'default',
    },
  },
};
