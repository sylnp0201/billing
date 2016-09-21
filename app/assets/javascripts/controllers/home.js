angular
  .module('app.controllers')
  .controller('HomeController', ['$uibModal', 'Notification', 'Bill', 'BillStats',
    function($uibModal, Notification, Bill, BillStats) {
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

      $ctrl.toggleCollapsed = function(group) {
        group.isCollapsed = !group.isCollapsed;
      };

      // refresh the page
      $ctrl.refresh = function() {
        $ctrl.bills = Bill.query({
          startday: $ctrl.startday,
          endday: $ctrl.endday,
        }, function() {
          $ctrl.groups = BillStats.createGroup($ctrl.bills);
          window.groups = $ctrl.groups;
        });
      };

      // init the page
      $ctrl.lastMonth(); // by default show the data of the last month
    }
  ]);
