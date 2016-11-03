angular
  .module('app.controllers')
  .controller('HomeController', [
    '$uibModal', 'Notification', 'BillStats', 'Bill', 'Case', 'Reason', 'Download',
    function($uibModal, Notification, BillStats, Bill, Case, Reason, Download) {
      var $ctrl = this;

      // set the date range for the last n days
      $ctrl.lastNDays = function(n) {
        var dt = new Date();
        dt.setDate(dt.getDate()-n+1);
        dt.setHours(0,0,0,0); // start of today
        $ctrl.startday = dt;
        $ctrl.endday = new Date();
        $ctrl.refresh();
      };

      // set the date range as the last month
      $ctrl.lastMonth = function() {
        var dt = new Date();

        var thisMonth = dt.getMonth();
        var lastMonth = thisMonth ? thisMonth - 1 : 11;
        dt.setMonth(lastMonth);
        dt.setDate(1); // first day of a month
        dt.setHours(0,0,0,0); // start of a day
        $ctrl.startday = dt;

        var thisYear = dt.getFullYear();
        var year = thisMonth ? thisYear : thisYear - 1;
        var lastDay = new Date(year, lastMonth + 1, 0);
        lastDay.setHours(23, 59, 59, 0); // end of a day
        $ctrl.endday = lastDay;
        return $ctrl.refresh();
      };

      $ctrl.thisMonth = function() {
        var dt = new Date();
        dt.setDate(1);
        dt.setHours(0,0,0,0);
        $ctrl.startday = dt;
        $ctrl.endday = new Date();
        $ctrl.refresh();
      }

      // set the date range as the last week
      $ctrl.lastWeek = function() {
        return $ctrl.lastNDays(7);
      };

      // set the date range as today
      $ctrl.today = function() {
        return $ctrl.lastNDays(1);
      };

      // set the date range as the last month
      $ctrl.all = function() {
        $ctrl.startday = new Date('2012-01-01');
        $ctrl.endday = new Date('2032-12-31');
        $ctrl.refresh();
      };

      $ctrl.toggleCollapsed = function(group) {
        group.isCollapsed = !group.isCollapsed;
      };

      // create a new bill
      $ctrl.create = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'bills/new.html',
          controller: 'NewBillModalCtrl',
          controllerAs: '$ctrl',
          resolve: {
            cases: function() { return Case.query(); },
            reasons: function() { return Reason.query(); },
          }
        });

        modalInstance.result.then(function (newBill) {
          newBill.case_id = newBill.case.id;
          Bill.save(
            { bill: newBill },
            function(data) {
              Notification.success('A new bill has been created.');
              $ctrl.bills.push(new Bill(data));
              $ctrl.groups = BillStats.createGroup($ctrl.bills);
            },
            Utils.notifyError(Notification)
          );
        });
      };

      // delete a bill
      $ctrl.destroy = function(id) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'bills/destroy.html',
          controller: 'DestroyBillModalCtrl',
          controllerAs: '$ctrl',
          resolve: {
            bill: function () {
              return $ctrl.bills.find(function(bill) {
                return bill.id === id;
              });
            }
          }
        });

        modalInstance.result.then(function(billToDelete) {
          billToDelete.$delete(
            function(data) {
              Notification.success('Billing record has been deleted.');
              $ctrl.bills = $ctrl.bills
                .filter(function(item) {
                  return item.id !== billToDelete.id;
                });
              $ctrl.refresh();
            },
            Utils.notifyError(Notification)
          );
        });
      };

      // download the excel sheet
      $ctrl.download = function() {
        return Download.post($ctrl);
      }

      // refresh the page
      $ctrl.refresh = function() {
        $ctrl.bills = Bill.query({
          startday: $ctrl.startday,
          endday: $ctrl.endday,
        }, function() {
          $ctrl.groups = BillStats.createGroup($ctrl.bills);
          $ctrl.totalSpent = $ctrl.groups.reduce(function(total, current) {
            return total + current.spent;
          }, 0);
        });
      };

      // init the page
      $ctrl.today(); // by default show the data of the last month
    }
  ]);
