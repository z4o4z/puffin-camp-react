/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { join } = require('path');
const PWAManifestPlugin = require('webpack-pwa-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const InlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const CONFIG = require('./client.js');
const { PATH_SRC, PATH_PUBLIC, PATH_NODE_MODULES } = require('./common.js');

const PATH_SRC_INDEX = join(PATH_SRC, './index.jsx');

module.exports = merge(CONFIG, {
  bail: true,
  mode: 'production',

  entry: {
    main: PATH_SRC_INDEX,
  },

  output: {
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].chunk.js',
  },

  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          verbose: true,
          beautify: false,
          comments: false,
          warnings: false,
          compress: {
            loops: true,
            unsafe: false,
            unused: true,
            booleans: true,
            sequences: true,
            drop_console: false,
          },
        },
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: true,
              camelCase: true,
              importLoaders: 1,
              localIdentName: '[local]-[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
        exclude: [PATH_NODE_MODULES],
        include: [PATH_SRC],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    new LodashModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: join(PATH_PUBLIC, './index.html'),
      minify: {
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        removeComments: true,
        useShortDoctype: true,
        keepClosingSlash: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
      templateParameters: {
        NODE_PATH: process.env.NODE_PATH,
        PUBLIC_URL: process.env.PUBLIC_URL,
      },
      inlineSource: 'runtime~.+\\.js',
    }),
    new PreloadWebpackPlugin({
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.(woff|woff2|otf|ttf|eot)$/.test(entry)) return 'font';
        return 'script';
      },
      rel: 'preload',
      include: 'initial',
      exclude: 'runtime',
      fileBlacklist: [/\.map$/, /runtime.*.js/],
    }),
    new InlineSourcePlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].chunk..css',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new PWAManifestPlugin({
      name: 'Puffin Camp',
      icons: [
        {
          src: join(PATH_PUBLIC, '/images/puffin-camp.jpg'),
          sizes: [96, 128, 192, 256, 384, 512, 1024], // multiple sizes
        },
      ],
      short_name: 'PuffC',
      description: 'Puffin Camp React workshops!',
      crossorigin: 'anonymous',
      background_color: '#212121',
    }),
    new SWPrecacheWebpackPlugin({
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }

        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }

        console.log(message);
      },
      minify: true,
      cacheId: 'storyline',
      navigateFallback: `${process.env.PUBLIC_URL}index.html`,
      navigateFallbackWhitelist: [/^(?!(?:(?:\/__)|(?:\/events\/)|(?:\/public\/))).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      filename: '[path].gz[query]',
      algorithm: 'gzip',
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
});
