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

      // update the stats of the data model
      $ctrl.calculateStats = function() {
        $ctrl.groups.forEach(function(group) {
          var spents = group.bills.map(function(bill) {
            return bill.spent;
          });

          group.spent = spents.reduce(function(a, b) { return a+b; }, 0);
        });
      };

      // create the data model for the view
      $ctrl.dataModel = function() {
        $ctrl.groups = $ctrl.bills.reduce(function(groups, bill) {
          var casename = bill.case.name;
          var lastGroup = groups[groups.length - 1];

          if (!lastGroup || lastGroup.case.name !== casename) {
            var newGroup = {
              case: bill.case,
              bills: [bill],
            };
            groups.push(newGroup);
          } else {
            lastGroup.bills.push(bill);
          }

          return groups;
        }, []);

        $ctrl.calculateStats();
      };

      // refresh the page
      $ctrl.refresh = function() {
        $ctrl.bills = Bill.query({
          startday: $ctrl.startday,
          endday: $ctrl.endday,
        }, $ctrl.dataModel);
      };

      // init the page
      $ctrl.lastMonth(); // by default show the data of the last month
    }
  ]);
