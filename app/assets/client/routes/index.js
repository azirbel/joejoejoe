import angular from 'angular';

module.exports = angular.module('routes', [
  require('angular-ui-router'),
  require('./root'),
  require('./trial')
])
.config(($locationProvider) => {
  $locationProvider.html5Mode(true);
})
.name;
