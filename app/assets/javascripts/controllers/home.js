angular
  .module('app.controllers')
  .controller('HomeController', ['Bill', 'Case', '$uibModal', 'Notification',
    function(Bill, Case, $uibModal, Notification) {
      var $ctrl = this;

      // render index page
      $ctrl.init = () => {
        $ctrl.bills = Bill.query();
        $ctrl.cases = Case.query();
      };

      // create a new bill
      $ctrl.newBill = () => {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'bills/new.html',
          controller: 'NewBillModalCtrl',
          controllerAs: '$ctrl',
          resolve: {
            cases: () => $ctrl.cases,
          }
        });

        modalInstance.result.then(function (newBill) {
          newBill.case_id = newBill.case.id;
          Bill.save(
            { bill: newBill },
            (data) => {
              Notification.success('A new bill has been created.');
              $ctrl.bills.push(data);
            },
            Utils.notifyError(Notification)
          );
        });
      }

      // edit a new case
      $ctrl.editBill = (id) => {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'bills/edit.html',
          controller: 'EditBillModalCtrl',
          controllerAs: '$ctrl',
          resolve: {
            bill: () => $ctrl.bills.find((bill) => bill.id === id),
            cases: () => $ctrl.cases,
          }
        });

        modalInstance.result.then(function (billToUpdate) {
          billToUpdate.case_id = billToUpdate.case.id;
          billToUpdate.$update(
            (data) => {
              Notification.success('The billing record has been updated successfully.');
            },
            Utils.notifyError(Notification)
          );
        });
      };

      // delete a bill
      $ctrl.destroyBill = (id) => {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'bills/destroy.html',
          controller: 'DestroyBillModalCtrl',
          controllerAs: '$ctrl',
          resolve: {
            bill: function () {
              return $ctrl.bills.find((bill) => bill.id === id);
            }
          }
        });

        modalInstance.result.then(function (billToDelete) {
          billToDelete.$delete(
            (data) => {
              Notification.success('Billing record has been deleted.');
              $ctrl.bills = $ctrl.bills
                .filter((item) => item.id !== billToDelete.id);
            },
            Utils.notifyError(Notification)
          );
        });
      }

      // init the page
      $ctrl.init();
    }
  ]);
