import angular from 'angular';

module.exports = angular.module('routes.root', [
  require('angular-ui-router')
])
.config(($stateProvider) => {
  $stateProvider.state('root', {
    url: '/',
    template: require('./root.jade'),
    redirectTo: 'trial'
  });
})
.run(($rootScope, $state) => {
  $rootScope.$on('$stateChangeStart', function(e, to, params) {
    if (to.redirectTo) {
      e.preventDefault();
      $state.go(to.redirectTo, params);
    }
  });
})
.name;
