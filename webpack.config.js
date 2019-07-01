const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './examples/src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            {
              loader: 'url-loader',
              options:{
                  fallback: "file-loader",
                  name: "[name].[ext]",
                  outputPath: 'assets/',
                  publicPath: '/assets/'
              }
            }
        ]
    },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './examples/src/index.html'
    })
  ]
}