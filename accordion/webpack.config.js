'use strict';

const packageJson = require('./package.json');
const libraryName = packageJson.name.replace(/^.|-./g, s => s.toUpperCase()).replace('-', '');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    library: libraryName,
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
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
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: libraryName,
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
