const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');

const {
  extractCSS,
  loadImages,
  loadFonts,
} = require('./webpack.parts');

module.exports = merge([
  {
    output: {
      chunkFilename: "[name].[chunkhash:4].js",
      filename: "[name].[chunkhash:4].js",
    },
  },
  {
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/(.*)syncRoutes(\.*)/, resource => {
        resource.request = resource.request.replace(/syncRoutes/, 'asyncRoutes');
      })
    ],
  },
  extractCSS({
    exclude: /carousel\.css/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: true,
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]',
            hashPrefix: 'hash',

          },
          localsConvention: 'camelCase'
        },
      },
      'postcss-loader',
    ],
  }),
  extractCSS({
    include: /carousel\.css/,
    use: [
      MiniCssExtractPlugin.loader,
      { loader: 'css-loader', },
      'postcss-loader',
    ],
  }),
  loadImages({
    options: {
      limit: 35000,
      name: '[name].[hash:4].[ext]',
    },
  }),
  loadFonts({
    name: 'fonts/[name].[hash:4].[ext]',
  }),
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
          },
        },
      },
      runtimeChunk: {
        name: 'runtime'
      },
    },
  },
]);
