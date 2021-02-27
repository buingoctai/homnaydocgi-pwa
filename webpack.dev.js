const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3007,
    liveReload: true,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      API_BASE: 'https://homnaydocgiserver.xyz',
      // APP_BASE: 'http://localhost:3007',
    }),
  ],
});
