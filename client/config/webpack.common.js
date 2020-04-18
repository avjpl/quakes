const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
  loadJavaScript,
  loadSvg,
} = require('./webpack.parts');

module.exports = mode => merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
        template: 'web/index.html',
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
  },
  loadSvg(),
  loadJavaScript({
    ...(mode === 'production' ? { exclude: /node_modules/ } : {}),
  }),
]);
