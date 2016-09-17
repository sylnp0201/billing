angular
  .module('app.controllers')
  .controller('EditCaseModalCtrl', function ($uibModalInstance, kase) {
    var $ctrl = this;
    $ctrl.case = kase;

    $ctrl.ok = function() {
      $uibModalInstance.close($ctrl.case);
    };

    $ctrl.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
