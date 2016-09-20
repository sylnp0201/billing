angular
  .module('app.controllers')
  .controller('HomeController', ['Summary', '$uibModal', 'Notification', 'Bill',
    function(Summary, $uibModal, Notification, Bill) {
      var $ctrl = this;

      // set the date range for the last n days
      $ctrl.lastNDays = function(n) {
        var dt = new Date();
        dt.setDate(dt.getDate()-n);
        $ctrl.startday = dt;
        $ctrl.endday = new Date();
        $ctrl.refresh();
      };

      // set the date range as the last month
      $ctrl.lastMonth = function() {
        return $ctrl.lastNDays(30);
      };

      // set the date range as the last week
      $ctrl.lastWeek = function() {
        return $ctrl.lastNDays(7);
      };

      // set the date range as today
      $ctrl.today = function() {
        return $ctrl.lastNDays(0);
      };

      // refresh the page
      $ctrl.refresh = function() {
        $ctrl.bills = Bill.query({
          startday: $ctrl.startday,
          endday: $ctrl.endday,
        });
      };

      // init the page
      $ctrl.lastMonth(); // by default show the data of the last month
    }
  ]);
