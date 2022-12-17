
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    hot: true,
    host: 'localhost',
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
});