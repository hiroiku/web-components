'use strict';

const packageJson = require('./package.json');
const libraryId = packageJson.name.split('/').pop();
const libraryName = packageJson.name.replace(/^.|-./g, s => s.toUpperCase()).replace(/-/g, '');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    library: libraryName,
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    path: `${__dirname}/dist/`,
    filename: `${libraryId}.js`,
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
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: libraryName,
      template: `${__dirname}/public/index.html`,
    }),
  ],
};
