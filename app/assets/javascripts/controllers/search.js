angular
  .module('app.controllers')
  .controller('SearchCtrl', ['$uibModalInstance', 'Case',
    function($uibModalInstance, Case) {
      var $ctrl = this;
      $ctrl.case = {};

      setTimeout(function() {
        document.querySelector('.search-input').focus();
      }, 50);

      $ctrl.autocomplete = function() {
        $ctrl.autocompleteOptions = [];

        if (!$ctrl.case.name) {
          return;
        }

        Case.query({ q: $ctrl.case.name }).$promise
          .then(function(cases) {
            $ctrl.autocompleteOptions = cases;
          });
      };

      $ctrl.select = function(item) {
        $ctrl.autocompleteOptions = [];

        if (!item) {
          return;
        }

        $ctrl.case = item;

        $ctrl.search();
      };

      $ctrl.search = function() {
        if (!$ctrl.case) {
          return;
        }

        Case.get({ id: $ctrl.case.id }).$promise
          .then(function(result) {
            $ctrl.result = result;
          });
      };

      $ctrl.close = function() {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]);
