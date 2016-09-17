angular
  .module('app.controllers')
  .controller('DestroyCaseModalCtrl', function($uibModalInstance, item) {
    var $ctrl = this;
    $ctrl.item = item;

    $ctrl.ok = function() {
      $uibModalInstance.close(item);
    };

    $ctrl.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
