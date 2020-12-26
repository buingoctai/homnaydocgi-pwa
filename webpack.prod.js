const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      API_BASE: 'https://homnaydocgi-server.herokuapp.com',
      APP_BASE: 'https://homnaydocgi-client.herokuapp.com',
    }),
  ],
});
