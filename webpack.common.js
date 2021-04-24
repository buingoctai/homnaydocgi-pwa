const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const ESLintPlugin = require("eslint-webpack-plugin");
// const options = {
//     "parserOptions": {
//         "ecmaVersion": 6,
//         "sourceType": "module",
//         "ecmaFeatures": {
//             "jsx": true
//         }
//     },
//     "parser": "esprima",
//     "rules": {
//         "semi": "error"
//     }
// };
module.exports = {
  entry: { index: path.resolve(__dirname, 'src', 'index.js') },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|mp4)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {  test: /\.(ts|tsx)$/, use: [{loader: 'ts-loader'}] },
    ],
  },
  resolve: {
    alias: {
      srcRoot: path.resolve(__dirname, './src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
 
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
    new CaseSensitivePathsPlugin(),
  ],
};
