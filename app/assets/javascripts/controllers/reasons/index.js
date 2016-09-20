angular
  .module('app.controllers')
  .controller('ReasonsController', ['$uibModal', 'Reason', 'Notification',
    function($uibModal, Reason, Notification) {
      var $ctrl = this;

      // render reason index page
      $ctrl.init = function() {
        $ctrl.reasons = Reason.query();
      };

      // create a new reason
      $ctrl.create = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'reasons/new.html',
          controller: 'NewReasonModalCtrl',
          controllerAs: '$ctrl',
        });

        modalInstance.result.then(function (newReason) {
          Reason.save(
            { reason: newReason },
            function(data) {
              Notification.success('A new billing reason has been created.');
              $ctrl.reasons.unshift(data);
            },
            Utils.notifyError(Notification)
          );
        });
      };

      // edit a new reason
      $ctrl.edit = function(id) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'reasons/edit.html',
          controller: 'EditReasonModalCtrl',
          controllerAs: '$ctrl',
          resolve: {
            reason: function () {
              return $ctrl.reasons.find(function(reason) {
                return reason.id === id;
              });
            }
          }
        });

        modalInstance.result.then(function (reasonToUpdate) {
          reasonToUpdate.$update(
            function(data) {
              Notification.success('The billing reason has been updated successfully.');
            },
            Utils.notifyError(Notification)
          );
        });
      };

      // delete a reason
      $ctrl.destroy = function(id) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'reasons/destroy.html',
          controller: 'DestroyReasonModalCtrl',
          controllerAs: '$ctrl',
          resolve: {
            reason: function () {
              return $ctrl.reasons.find(function(item) {
                return item.id === id;
              });
            }
          }
        });

        modalInstance.result.then(function (reasonToDelete) {
          reasonToDelete.$delete(
            function(data) {
              Notification.success('Billing reason has been deleted.');
              $ctrl.reasons = $ctrl.reasons
                .filter(function(item) {
                  return item.id !== reasonToDelete.id;
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
