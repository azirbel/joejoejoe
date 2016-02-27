import angular from 'angular';

module.exports = angular.module('routes.trial', [
  require('angular-ui-router')
])
.config(($stateProvider) => {
  $stateProvider.state('trial', {
    parent: 'root',
    url: 'trial',
    template: require('./trial.html'),
  });
})
.name;
