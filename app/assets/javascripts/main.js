angular.module('app.controllers', []);
angular.module('app.resources', []);
angular.module('app.directives', []);

var Utils = Utils || {
  notifyError: (notify) => {
    return (error) => {
      notify.error((error.data && error.data.message) || error.statusText || 'Error!');
    }
  }
};

const app = angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'ui-notification',
  'ngResource',
  'ng-token-auth',
  'templates',
  'app.resources',
  'app.controllers',
  'app.directives',
])
.config(['$locationProvider', '$stateProvider', 'NotificationProvider',
  function ($locationProvider, $stateProvider, NotificationProvider) {
    $stateProvider
      .state({
        name: 'home',
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeController as $ctrl',
        resolve: { auth: ($auth) => $auth.validateUser() },
      })
      .state({
        name: 'login',
        url: '/sign_in',
        templateUrl: 'user_sessions/new.html',
      })
      .state({
        name: 'signUp',
        url: '/sign_up',
        templateUrl: 'user_registrations/new.html',
        controller: 'UserRegistrationsController',
      })
      .state({
        name: 'bills',
        url: '/billings',
        templateUrl: 'bills/index.html',
        controller: 'BillsController as $ctrl',
        resolve: { auth: ($auth) => $auth.validateUser() },
      })
      .state({
        name: 'cases',
        url: '/cases',
        templateUrl: 'cases/index.html',
        controller: 'CasesController as $ctrl',
        resolve: { auth: ($auth) => $auth.validateUser() },
      });

    $locationProvider.html5Mode(true);

    NotificationProvider.setOptions({
      delay: 3000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'left',
      positionY: 'bottom'
    });
  }
]);

app.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('auth:login-success', function() {
    $location.path('/');
  });
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    if (error && error.reason === 'unauthorized') {
      event.preventDefault();
      $location.path('/sign_in');
    }
  });
}]);
