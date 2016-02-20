var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:  './app/assets/javascripts/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: process.env.NODE_ENV ?
      'bundle-[name]-[chunkhash].js' : 'bundle-[name].js',
    sourceMapFilename: '[file].map.json',
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: ['ng-annotate?regexp=^.?angular.*$', 'babel?presets=es2015'],
      exclude: /node_modules/
    },
    {
      test: /\.html$/,
      loader: "html"
    }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: 'public',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin( {
      template: path.resolve(__dirname, 'app/views/index.html')
    })
  ],
};
