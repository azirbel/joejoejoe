import angular from 'angular';

module.exports = angular.module('routes.root', [
  require('angular-ui-router')
])
.config(($stateProvider) => {
  $stateProvider.state('root', {
    url: '/',
    template: require('./root.jade')
  });
})
.run(($state) => {
   $state.go('trial');
})
.name;
