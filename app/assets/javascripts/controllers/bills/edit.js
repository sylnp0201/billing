angular
  .module('app.controllers')
  .controller('EditBillModalCtrl', function ($uibModalInstance, bill, cases) {
    var $ctrl = this;
    $ctrl.bill = bill;
    $ctrl.cases = cases;

    $ctrl.ok = function() {
      $uibModalInstance.close($ctrl.bill);
    };

    $ctrl.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
