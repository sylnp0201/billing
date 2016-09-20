angular
  .module('app.controllers')
  .controller('EditBillModalCtrl', ['$uibModalInstance', 'bill', 'cases', 'reasons',
    function ($uibModalInstance, bill, cases, reasons) {
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
        $ctrl.reasons = reasons;
        $ctrl.calendar = { opened: false };
      };

      $ctrl.init();
    }
  ]);
