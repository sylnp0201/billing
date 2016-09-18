angular
  .module('app.controllers')
  .controller('BillsController', ['Bill', 'Case', '$uibModal', 'Notification',
    function(Bill, Case, $uibModal, Notification) {
      var $ctrl = this;

      // render index page
      $ctrl.init = function() {
        $ctrl.bills = Bill.query();
      };

      // fetch cases
      $ctrl.fetchCases = function() {
        if (!$ctrl.cases) {
          return $ctrl.cases = Case.query();
        }

        return $ctrl.cases;
      }

      // create a new bill
      $ctrl.newBill = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'bills/new.html',
          controller: 'NewBillModalCtrl',
          controllerAs: '$ctrl',
          resolve: {
            cases: $ctrl.fetchCases,
          }
        });

        modalInstance.result.then(function (newBill) {
          newBill.case_id = newBill.case.id;
          Bill.save(
            { bill: newBill },
            function(data) {
              Notification.success('A new bill has been created.');
              $ctrl.bills.push(data);
            },
            Utils.notifyError(Notification)
          );
        });
      }

      // edit a new case
      $ctrl.editBill = function(id) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'bills/edit.html',
          controller: 'EditBillModalCtrl',
          controllerAs: '$ctrl',
          resolve: {
            bill: function() {
              return $ctrl.bills.find(function(bill) {
                return bill.id === id;
              });
            },
            cases: $ctrl.fetchCases,
          }
        });

        modalInstance.result.then(function (billToUpdate) {
          billToUpdate.case_id = billToUpdate.case.id;
          billToUpdate.$update(
            function(data) {
              Notification.success('The billing record has been updated successfully.');
            },
            Utils.notifyError(Notification)
          );
        });
      };

      // delete a bill
      $ctrl.destroyBill = function(id) {
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

        modalInstance.result.then(function (billToDelete) {
          billToDelete.$delete(
            function(data) {
              Notification.success('Billing record has been deleted.');
              $ctrl.bills = $ctrl.bills
                .filter(function(item) {
                  return item.id !== billToDelete.id;
                });
            },
            Utils.notifyError(Notification)
          );
        });
      }

      // init the page
      $ctrl.init();
    }
  ]);
