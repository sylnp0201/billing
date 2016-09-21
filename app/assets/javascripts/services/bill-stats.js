angular
  .module('app.resources')
  .factory('BillStats', ['Bill',
    function(Bill) {
      var updateStats = function (groups) {
        groups.forEach(function(group) {
          var spents = group.bills.map(function(bill) {
            return bill.spent;
          });

          group.spent = spents.reduce(function(a, b) { return a+b; }, 0);
        });

        return groups;
      }

      var createGroup = function (bills) {
        var groups = bills.reduce(function(groups, bill) {
          var casename = bill.case.name;
          var lastGroup = groups[groups.length - 1];

          if (!lastGroup || lastGroup.case.name !== casename) {
            var newGroup = {
              case: bill.case,
              bills: [bill],
              isCollapsed: true,
            };
            groups.push(newGroup);
          } else {
            lastGroup.bills.push(bill);
          }

          return groups;
        }, []);

        return updateStats(groups);
      };

      return {
        createGroup: createGroup,
        updateStats: updateStats,
      };
    }
  ]);
