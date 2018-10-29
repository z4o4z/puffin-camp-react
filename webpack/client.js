/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { CONFIG, PATH_PUBLIC, PATH_DIST } = require('./common.js');

module.exports = merge(CONFIG, {
  plugins: [
    new CopyWebpackPlugin([{ from: PATH_PUBLIC, to: PATH_DIST }], {
      ignore: 'index.html',
    }),
  ],
});
