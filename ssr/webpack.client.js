const { resolve } = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.base');

const clientConfig = {
  mode: 'production',
  entry: './src/app/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build', 'js'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'ignore-loader',
          },
        ],
      },
    ],
  },
};

module.exports = merge(base, clientConfig);
