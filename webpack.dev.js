const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3005,
    hot: true,
    host: 'localhost',
    //this is needed for react-router to work
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        //server is running on 5000
        target: 'http://localhost:5000',
        secure: false,
      },
    },
  },
});
