const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './web/src/index.js',
  //allows 'import dashboard from ./dashboard' instead of 'import dashboard from ./dashboard.jsx'
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
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        loader: 'file-loader',
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
