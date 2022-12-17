const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './web/src/index.js',
  //allows 'import dashboard from ./dashboard' instead of 'import dashboard from ./dashboard.jsx, etc.'
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.css',
      '.scss',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.(s?c|sa)ss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'], // remember order matters --> goes from end to front
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        exclude: /node_modules/,
        //NOTE: background image set in css wasn't working when using file loader, but every other image was working. with using type: 'asset/resource' instead, everything is loading.
        type: 'asset/resource',
        // use: [
        //   {
        //     loader: 'file-loader',
        //     // options: {
        //     //   name: '[name].[ext]',
        //     //   outputPath: 'images/',
        //     // },
        //   },
        // ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/public/index.html',
      filename: 'index.html',
    }),
  ],
};
