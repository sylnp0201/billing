angular
  .module('app.controllers')
  .controller('EditBillModalCtrl', ['$uibModalInstance', 'bill', 'cases',
    function ($uibModalInstance, bill, cases) {
      var $ctrl = this;

      $ctrl.openCalendar = function() {
        $ctrl.calendar.opened = true;
      };

      $ctrl.dateOptions = Utils.calendarOptions;
      $ctrl.dateFormat = 'yyyy-MM-dd';

      $ctrl.ok = function() {
        $uibModalInstance.close($ctrl.bill);
      };

      $ctrl.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };

      $ctrl.init = function() {
        $ctrl.bill = bill;
        $ctrl.cases = cases;
        $ctrl.calendar = { opened: false };
      };

      $ctrl.init();
    }
  ]);
