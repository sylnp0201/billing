angular
  .module('app.controllers')
  .controller('HomeController', ['Summary', '$uibModal', 'Notification', 'Bill',
    function(Summary, $uibModal, Notification, Bill) {
      var $ctrl = this;

      // render index page
      $ctrl.init = function() {
        $ctrl.summary = Summary.query(function(items) {
          return items.map(function(item) {
            return Object.assign(item, { isCollapsed: true });
          });
        });
      };

      // toggle summary record collapse
      $ctrl.toggleCollapsed = function(item) {
        item.isCollapsed = !item.isCollapsed;
      };

      // recalculate the item spent
      $ctrl.updateSpent = function(item) {
        item.stats.spent = item.bills.reduce(function(prev, curr) {
          return prev + curr.spent;
        }, 0);
      };

      $ctrl.removeBillFromCase = function(kase, billId) {
        kase.bills = kase.bills.filter(function(b) {
          return b.id !== billId;
        });
      };

      // delete a bill
      $ctrl.destroyBill = function(item, id) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'bills/destroy.html',
          controller: 'DestroyBillModalCtrl',
          controllerAs: '$ctrl',
          resolve: {
            bill: function () {
              return Bill.get({ id: id });
            }
          }
        });

        modalInstance.result.then(function (billToDelete) {
          billToDelete.$delete(
            function(data) {
              Notification.success('Billing record has been deleted.');
              $ctrl.removeBillFromCase(item, id);
              $ctrl.updateSpent(item);
            },
            Utils.notifyError(Notification)
          );
        });
      }

      // init the page
      $ctrl.init();
    }
  ]);
