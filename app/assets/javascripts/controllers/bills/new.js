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

      $ctrl.dateOptions = {
        maxDate: new Date(2032, 1, 1),
        minDate: new Date(2012, 1, 1),
        showWeeks: false,
      };

      $ctrl.dateFormat = 'yyyy-MM-dd';

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
