angular
  .module('app.controllers')
  .controller('NewBillModalCtrl', ['$uibModalInstance', 'cases',
    function ($uibModalInstance, cases) {
      var $ctrl = this;

      $ctrl.today = function() {
        $ctrl.bill.date = new Date();
      };

      $ctrl.openCalendar = function() {
        $ctrl.calendar.opened = true;
      };

      $ctrl.dateOptions = Utils.calendarOptions;
      $ctrl.dateFormat = Utils.calendarDateFormat;

      $ctrl.ok = function() {
        $uibModalInstance.close($ctrl.bill);
      };

      $ctrl.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };

      $ctrl.init = function() {
        $ctrl.bill = {};
        $ctrl.cases = cases;
        $ctrl.calendar = { opened: false };
        $ctrl.today();
      };

      $ctrl.init();
    }
  ]);
