angular
  .module('app.controllers')
  .controller('NewReasonModalCtrl', ['$uibModalInstance',
    function ($uibModalInstance) {
      var $ctrl = this;
      $ctrl.reason = {};

      $ctrl.ok = function() {
        $uibModalInstance.close($ctrl.reason);
      };

      $ctrl.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]);
