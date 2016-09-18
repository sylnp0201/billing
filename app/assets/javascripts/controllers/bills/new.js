angular
  .module('app.controllers')
  .controller('NewBillModalCtrl', function ($uibModalInstance, cases) {
    var $ctrl = this;
    $ctrl.bill = { date: new Date() };
    $ctrl.cases = cases;

    $ctrl.ok = function() {
      $uibModalInstance.close($ctrl.bill);
    };

    $ctrl.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
