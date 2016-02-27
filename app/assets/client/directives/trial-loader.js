import angular from 'angular';
import Trial from '../js/trial/trial.js'

module.exports = angular.module('trial-loader', [])
.directive('trialLoader', () => {
  let linkFn = (scope, elem) => {
    let canvas = elem.find('canvas');
    let trial = new Trial(canvas);
  };

  return {
    link: linkFn,
    restrict: 'E',
    template: require('./trial-loader.html'),
  };
})
.name;
