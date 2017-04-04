angular
  .module('app.controllers')
  .controller('UserSessionsController', ['$rootScope', 'Notification',
    function ($rootScope, Notification) {
      $rootScope.$on('auth:login-error', function() {
        Notification.error({
          message: 'Incorrect username or password',
          delay: 6000,
          replaceMessage: true,
        });
      });

      $rootScope.$on('auth:login-success', function() {
        Notification.success({
          message: 'You have successfully logged in.',
          delay: 1500,
          replaceMessage: true,
        });
      });
    }]);
