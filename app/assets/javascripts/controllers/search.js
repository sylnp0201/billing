angular
  .module('app.controllers')
  .controller('SearchCtrl', ['$uibModalInstance', 'Case',
    function($uibModalInstance, Case) {
      var $ctrl = this;

      $ctrl.init = function() {
        $ctrl.case = {};
        document.querySelector('.search-input').focus();
      };

      $ctrl.autocomplete = function() {
        $ctrl.autocompleteOptions = [];

        if (!$ctrl.case.name) {
          return;
        }

        Case.query({ q: $ctrl.case.name }).$promise
          .then(function(cases) {
            if (cases && cases.length === 1) {
              $ctrl.select(cases[0]);

              return;
            }

            $ctrl.autocompleteOptions = cases;
          });
      };

      $ctrl.select = function(item) {
        $ctrl.autocompleteOptions = [];

        if (!item) {
          return;
        }

        Case.get({ id: item.id }).$promise
          .then(function(result) {
            $ctrl.result = result;
          });
      };

      $ctrl.close = function() {
        $uibModalInstance.dismiss('cancel');
      };

      setTimeout(function() {
        $ctrl.init();
      }, 50);
    }
  ]);
