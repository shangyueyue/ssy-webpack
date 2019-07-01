const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 注入html
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const webpackBaseConf = require('./webpack.base.conf');

const webpackProConf = {
  mode: 'production',
  devtool: 'source-map',
  // externals: {
  //   jquery: 'jQuery',
  // },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // new CleanWebpackPlugin(),
    // new webpack.HashedModuleIdsPlugin(), // 缓存
    // new BundleAnalyzerPlugin(), // 分析bundle
  ],

};

const webpackConfigs = merge(webpackBaseConf, webpackProConf);
module.exports = webpackConfigs;
