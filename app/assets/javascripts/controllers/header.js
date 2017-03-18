angular
  .module('app.controllers')
  .controller('HeaderController', ['$scope', '$rootScope', '$location', '$uibModal',
    function($scope, $rootScope, $location, $uibModal) {
      var $ctrl = this;

      $ctrl.openSearch = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          size: 'lg',
          templateUrl: 'search.html',
          controller: 'SearchCtrl',
          controllerAs: '$ctrl',
        });
      };
    }
  ]);
