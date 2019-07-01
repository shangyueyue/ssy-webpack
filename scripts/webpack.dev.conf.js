const Webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); // 注入html

const merge = require('webpack-merge');

const webpackBaseConf = require('./webpack.base.conf');

const webpackDevConf = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'dist',
    // hotOnly: true,
    // open: true,
  },

  plugins: [
    new Webpack.DefinePlugin({
      ENV: 'true',
      // SERVE: "'https://www.baidu.com'",
      UAT: JSON.stringify('uat'),
    }),
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html',
    // }),
  ],
};

const webpackConfigs = merge(webpackBaseConf, webpackDevConf);
module.exports = webpackConfigs;
