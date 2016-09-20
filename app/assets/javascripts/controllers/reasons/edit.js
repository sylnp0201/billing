angular
  .module('app.controllers')
  .controller('EditReasonModalCtrl', ['$uibModalInstance', 'reason',
    function ($uibModalInstance, reason) {
      var $ctrl = this;

      $ctrl.reason = reason;

      $ctrl.ok = function() {
        $uibModalInstance.close($ctrl.reason);
      };

      $ctrl.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]);
