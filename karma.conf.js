var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'spec/js/**/*_spec.js'
    ],
    preprocessors: {
      'spec/js/**/*.js': ['webpack']
    },
    webpack: {
      devtool: 'eval',
      externals: [ 'angular', 'angular-mocks' ],
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    reporters: ['dots'],
    browsers: ['Chrome']
  })
}
