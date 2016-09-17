angular
  .module('app.controllers')
  .controller('CasesController', ['$scope', '$http', '$auth', 'Case',
    function($scope, $http, $auth, Case) {
      $scope.cases = Case.query();
    }
  ]);
