angular
  .module('app.controllers')
  .controller('HomeController', ['Summary', '$uibModal', 'Notification',
    function(Summary, $uibModal, Notification) {
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

      // init the page
      $ctrl.init();
    }
  ]);
