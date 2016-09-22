angular
  .module('app.controllers')
  .controller('EditBillModalCtrl', ['$scope', '$uibModalInstance', 'bill', 'cases', 'reasons',
    function ($scope, $uibModalInstance, bill, cases, reasons) {
      var $ctrl = this;

      $scope.taskTemplate = '';

      $scope.$watch('taskTemplate', function(value) {
        if (value && value.name) {
          $ctrl.bill.task = value.name;
          document.getElementById('task-input').focus();
        }
      });

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
