import angular from 'angular';

module.exports = angular.module('joejoejoe', [
  require('angular-sanitize'),
  require('./directives'),
  require('./routes')
])
.name;
