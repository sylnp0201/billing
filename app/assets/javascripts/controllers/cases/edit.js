angular
  .module('app.controllers')
  .controller('EditCaseModalCtrl', ['$uibModalInstance', 'kase',
    function ($uibModalInstance, kase) {
      var $ctrl = this;

      $ctrl.ok = function() {
        $uibModalInstance.close($ctrl.case);
      };

      $ctrl.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };

      $ctrl.init = function() {
        $ctrl.case = kase;
      };

      $ctrl.init();
    }
  ]);
