/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge');
const webpack = require('webpack');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const { PATH_SRC, PATH_DIST, PATH_PUBLIC, PATH_NODE_MODULES } = require('./common.js');
const CONFIG = require('./client.js');

const PATH_SRC_INDEX = join(PATH_SRC, './index.jsx');

module.exports = merge(CONFIG, {
  mode: 'development',
  devtool: 'cheap-module-source-map',

  entry: {
    main: [
      `webpack-dev-server/client?http://${process.env.HOST}:${process.env.PORT}`,
      'webpack/hot/only-dev-server',
      PATH_SRC_INDEX,
    ],
  },

  output: {
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[path]:[local]-[hash:base64:5]',
            },
          },
        ],
        exclude: [PATH_NODE_MODULES],
        include: [PATH_SRC],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
        ],
        exclude: [PATH_SRC],
        include: [PATH_NODE_MODULES],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: join(PATH_PUBLIC, './index.html'),
      templateParameters: {
        NODE_PATH: process.env.NODE_PATH,
        PUBLIC_URL: process.env.PUBLIC_URL,
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
  ],

  performance: {
    hints: false,
  },

  devServer: {
    hot: true,
    open: true,
    host: process.env.HOST,
    port: process.env.PORT,
    quiet: false,
    proxy: {
      '/api': {
        target: process.env.API_PROXY,
        // pathRewrite: { '^/api': '' },
      },
    },
    inline: true,
    overlay: true,
    compress: true,
    contentBase: PATH_DIST,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
});
