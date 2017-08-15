var webpack = require('webpack');

module.exports = {
  entry: {
    path: './septa-fare-calculator/main.js'
  },
  output: {
    path: __dirname+'/septa-fare-calculator/index.html',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",

        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './septa-fare-calculator',
    inline: true
  }
}
