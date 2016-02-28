import angular from 'angular';
import Trial from '../js/trial/trial'

module.exports = angular.module('trial-loader', [])
.directive('trialLoader', () => {
  let linkFn = (scope, elem) => {
    let canvas = elem.find('canvas')[0];
    let trial = new Trial(canvas);
  };

  return {
    link: linkFn,
    restrict: 'E',
    template: require('./trial-loader.jade'),
  };
})
.name;
