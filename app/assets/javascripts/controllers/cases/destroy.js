angular
  .module('app.controllers')
  .controller('DestroyCaseModalCtrl', ['$uibModalInstance', 'item',
    function($uibModalInstance, item) {
      var $ctrl = this;
      $ctrl.item = item;

      $ctrl.ok = function() {
        $uibModalInstance.close($ctrl.item);
      };

      $ctrl.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
    }
  ]);
