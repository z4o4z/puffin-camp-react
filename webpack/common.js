/* eslint-disable import/no-extraneous-dependencies */

const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const { join } = require('path');
const webpack = require('webpack');

const pkg = require('../package.json');

const PATH_SRC = join(__dirname, '../src');
const PATH_DIST = join(__dirname, '../dist');
const PATH_PUBLIC = join(__dirname, '../public');
const PATH_NODE_MODULES = join(__dirname, '../node_modules');
const PATH_PACKAGE_JSON = join(__dirname, '../package.json');

console.info('\n\n---> App version:', pkg.version, '\n\n');

exports.PATH_SRC = PATH_SRC;
exports.PATH_DIST = PATH_DIST;
exports.PATH_PUBLIC = PATH_PUBLIC;
exports.PATH_NODE_MODULES = PATH_NODE_MODULES;

exports.CONFIG = {
  output: {
    path: PATH_DIST,
    publicPath: process.env.PUBLIC_URL,
  },

  resolve: {
    modules: [PATH_SRC, 'node_modules'],
    plugins: [new ModuleScopePlugin(PATH_SRC, [PATH_PACKAGE_JSON])],
    extensions: ['.js', '.jsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: PATH_SRC,
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(woff|woff2|otf|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[hash:8].[ext]',
          noquotes: true,
        },
      },
      {
        test: /\.(bmp|jpe?g|png|gif)$/i,
        loader: 'url-loader',
        options: {
          name: 'images/[name].[hash:8].[ext]',
          limit: 10000,
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        IS_SSR: JSON.stringify(process.env.IS_SSR),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        APP_VERSION: JSON.stringify(pkg.version),
      },
    }),
  ],
};
