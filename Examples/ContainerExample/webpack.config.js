const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    src: './client/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ],
  devServer: {
    proxy: {
      '/': 'http://localhost:1113',
    },
    historyApiFallback: true,
  }
}