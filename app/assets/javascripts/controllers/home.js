angular
  .module('app.controllers')
  .controller('HomeController', ['Summary', '$uibModal', 'Notification',
    function(Summary, $uibModal, Notification) {
      var $ctrl = this;

      // render index page
      $ctrl.init = () => {
        $ctrl.summary = Summary.query((items) => {
          return items.map((item) =>
            Object.assign(item, { isCollapsed: true }));
        })
      };

      // toggle summary record collapse
      $ctrl.toggleCollapsed = (item) => {
        item.isCollapsed = !item.isCollapsed;
      };

      // init the page
      $ctrl.init();
    }
  ]);
