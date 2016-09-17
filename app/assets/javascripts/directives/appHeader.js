angular
  .module('app.directives')
  .directive('appHeader', function() {
    return {
      restrict: 'E',
      controller: 'HeaderController',
      templateUrl: 'global/header.html'
    };
  });
