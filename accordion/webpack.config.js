'use strict';

const packageJson = require('./package.json');
const pageTitle = packageJson.name.replace(/^.|-./g, s => s.toUpperCase()).replace('-', '');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    [packageJson.name]: {
      import: './src/index.ts',
      library: {
        name: pageTitle,
        type: 'umd',
      },
    },
  },
  output: {
    path: `${__dirname}/dist/`,
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '@': `${__dirname}/src/`,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: pageTitle,
      template: `${__dirname}/public/index.html`,
    }),
  ],
  devServer: {
    static: {
      directory: `${__dirname}/public/`,
    },
    compress: true,
    port: 8080,
  },
};
