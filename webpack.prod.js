const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // minify css

const common = require('./webpack.common.js');

const production = merge(common, {
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: ['...', new MiniCssExtractPlugin()], // "..." used to use defaults of terser minimazer - built in webpack5
  },
});

module.exports = production;