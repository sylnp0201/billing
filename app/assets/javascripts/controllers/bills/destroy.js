angular
  .module('app.controllers')
  .controller('DestroyBillModalCtrl', ['$uibModalInstance', 'bill',
    function($uibModalInstance, bill) {
      var $ctrl = this;

      $ctrl.ok = function() {
        $uibModalInstance.close(bill);
      };

      $ctrl.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]);
