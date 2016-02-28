var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var jade = require('jade');

module.exports = {
  entry:  './app/assets/client/joejoejoe.js',
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
    },
    {
      test: /\.jade$/,
      loader: "jade"
    },
    ]
  },
  resolve: {
    alias: {
      res: path.resolve(__dirname, 'app/assets/client/res'),
      js: path.resolve(__dirname, 'app/assets/client/js'),
    },
    extensions: [ '', '.js' ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: 'public',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin( {
      templateContent: (templateParams) => {
        var template = path.resolve(__dirname, 'app/assets/index.jade');
        return jade.renderFile(template, templateParams);
      }
    })
  ],
};
