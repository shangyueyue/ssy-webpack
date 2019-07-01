const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js',
    // test: './src/test.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.join(__dirname, '../', 'src'),
    },
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../', 'loaders'), 'node_modules'],
  },
  externals: {
    jquery: 'jQuery',
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        loader: 'reverse-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.(m?js$)/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-syntax-dynamic-import',
              // path.resolve('src/plugins/babel/babel-plugin-ssyImport'),
            ],
          },
        },
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader', // 将Adds CSS to the DOM by injecting a <style> tag
          'css-loader', // interprets @import and url() like import/require() and will resolve them.
          'less-loader', // compiles Less to CSS, The less-loader requires less as peerDependency
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: utils.assetsPath('img/[name].[hash:7].[ext]')
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: utils.assetsPath('media/[name].[hash:7].[ext]')
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        },
      },
    ],
  },
};
