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
        var bill = $ctrl.bill;
        var date = bill.date.getDate();

        if (bill.start_time) {
          bill.start_time.setDate(date);
        }

        if (bill.end_time) {
          bill.end_time.setDate(date);
        }

        if (bill.start_time && bill.end_time) {
          var diff = bill.end_time - bill.start_time;
          bill.spent = Math.round(diff/1000/60/60 * 100) / 100;
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
      };

      $ctrl.toggleTicktock = function() {
        var ticktock = $ctrl.ticktock;
        var btn = document.getElementById('ticktock');
        btn.blur();

        if (ticktock === 0 || ticktock === '0') {
          // end counting
          $ctrl.bill.end_time = new Date();
          $ctrl.timeChanged();
          btn.querySelector('.action-text').textContent = 'Tick';
        } else {
          // start counting
          var start = new Date();
          $ctrl.bill.start_time = start;
          btn.querySelector('.action-text').textContent = 'Tock';
        }
      };

      $ctrl.init = function() {
        $ctrl.bill = {};
        $ctrl.ticktock = "0";
        $ctrl.cases = cases;
        $ctrl.reasons = reasons;
        $ctrl.calendar = { opened: false };
        $ctrl.today();
      };

      $ctrl.init();
    }
  ]);
