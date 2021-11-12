const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    accordion: {
      import: './src/index.ts',
      library: {
        name: 'Accordion',
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
      template: `${__dirname}/test/index.html`,
    }),
  ],
  devServer: {
    static: {
      directory: `${__dirname}/test/`,
    },
    compress: true,
    port: 8080,
  },
};
