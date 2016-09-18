angular
  .module('app.controllers')
  .controller('EditBillModalCtrl', ['$uibModalInstance', 'bill', 'cases',
    function ($uibModalInstance, bill, cases) {
      var $ctrl = this;
      $ctrl.bill = bill;
      $ctrl.cases = cases;

      $ctrl.ok = function() {
        $uibModalInstance.close($ctrl.bill);
      };

      $ctrl.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]);
