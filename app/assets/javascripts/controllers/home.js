angular
  .module('app.controllers')
  .controller('HomeController', ['$scope', '$http', '$auth', 'Case',
    function($scope, $http, $auth, Case) {
      $scope.cases = Case.query();
    }
  ]);
