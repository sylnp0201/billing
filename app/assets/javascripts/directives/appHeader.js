angular
  .module('app.directives')
  .directive('appHeader', function() {
    return {
      restrict: 'E',
      controller: 'HeaderController',
      controllerAs: '$headerCtrl',
      templateUrl: 'global/header.html'
    };
  });
