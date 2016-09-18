angular
  .module('app.controllers')
  .controller('CasesController', ['$uibModal', 'Case', 'Notification',
    function($uibModal, Case, Notification) {
      var $ctrl = this;

      // render case index page
      $ctrl.init = function() {
        $ctrl.cases = Case.query();
      };

      // create a new case
      $ctrl.newCase = function() {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'cases/new.html',
          controller: 'NewCaseModalCtrl',
          controllerAs: '$ctrl',
        });

        modalInstance.result.then(function (newCase) {
          Case.save(
            { case: newCase },
            function(data) {
              Notification.success('A new case has been created.');
              $ctrl.cases.push(data);
            },
            Utils.notifyError(Notification)
          );
        });
      };

      // edit a new case
      $ctrl.editCase = function(id) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'cases/edit.html',
          controller: 'EditCaseModalCtrl',
          controllerAs: '$ctrl',
          resolve: {
            kase: function () {
              return $ctrl.cases.find(function(kase) {
                return kase.id === id;
              });
            }
          }
        });

        modalInstance.result.then(function (caseToUpdate) {
          caseToUpdate.$update(
            function(data) {
              Notification.success('The case has been updated successfully.');
            },
            Utils.notifyError(Notification)
          );
        });
      };

      // delete a case
      $ctrl.destroyCase = function(id) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'cases/destroy.html',
          controller: 'DestroyCaseModalCtrl',
          controllerAs: '$ctrl',
          resolve: {
            item: function () {
              return $ctrl.cases.find(function(item) {
                return item.id === id;
              });
            }
          }
        });

        modalInstance.result.then(function (caseToDelete) {
          caseToDelete.$delete(
            function(data) {
              Notification.success('Case has been deleted.');
              $ctrl.cases = $ctrl.cases
                .filter(function(item) {
                  return item.id !== caseToDelete.id;
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
