const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const {DefinePlugin} = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      API_BASE: 'https://homnaydocgiserver.xyz',
      APP_BASE: 'https://taibui.info',
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      LOG_ROCKET_KEY:JSON.stringify('48k7y2/taibui-blog'),
    })
  ],
});
