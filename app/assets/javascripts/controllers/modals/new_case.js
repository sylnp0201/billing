angular
  .module('app.controllers')
  .controller('NewCaseModalCtrl', function ($uibModalInstance) {
    var $ctrl = this;
    $ctrl.case = {};

    $ctrl.ok = function() {
      $uibModalInstance.close($ctrl.case);
    };

    $ctrl.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
