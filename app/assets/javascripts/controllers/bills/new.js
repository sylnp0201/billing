angular
  .module('app.controllers')
  .controller('NewBillModalCtrl', [
    '$scope', '$uibModalInstance', 'cases', 'reasons', 'Bill', 'LastBill',
    function ($scope, $uibModalInstance, cases, reasons, Bill, LastBill) {
      var $ctrl = this;
      $scope.taskTemplate = '';

      $scope.$watch('taskTemplate', function(value) {
        if (value && value.name) {
          $ctrl.bill.task = value.name;
          document.getElementById('task-input').focus();
        }
      });

      $ctrl.timeChanged = function() {
        if ($ctrl.bill.start_time && $ctrl.bill.end_time) {
          var start = new Date($ctrl.bill.start_time);
          var end = new Date($ctrl.bill.end_time);

          $ctrl.bill.spent = Math.round((end - start)/1000/60/60 * 10) / 10;;
        }
      };

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

      $ctrl.ditto = function() {
        LastBill.get().then(function(data) {
          $ctrl.bill = data;
        });
      }

      $ctrl.init = function() {
        $ctrl.bill = {};
        $ctrl.cases = cases;
        $ctrl.reasons = reasons;
        $ctrl.calendar = { opened: false };
        $ctrl.today();
      };

      $ctrl.init();
    }
  ]);
