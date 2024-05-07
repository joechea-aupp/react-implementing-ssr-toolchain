const nodeExternals = require('webpack-node-externals');
const { resolve, join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./webpack.base');
const { merge } = require('webpack-merge');

const serverConfig = {
  target: 'node',
  mode: 'production',
  entry: './src/server.js',
  externals: [nodeExternals()],
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: join('./', 'css', 'style.css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
};

module.exports = merge(base, serverConfig);
