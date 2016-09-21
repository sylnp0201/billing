angular.module('app.controllers', []);
angular.module('app.resources', []);
angular.module('app.directives', []);

var Utils = Utils || {
  notifyError: function (notify) {
    return function (error) {
      notify.error((error.data && error.data.message) || error.statusText || 'Error!');
    }
  },
  validateUser: ['$auth', function($auth) {
    return $auth.validateUser();
  }],
  calendarOptions: {
    maxDate: new Date(2032, 1, 1),
    minDate: new Date(2012, 1, 1),
    showWeeks: false,
  },
  calendarDateFormat: 'yyyy-MM-dd',
  strToDate: function(text) {
    return new Date(text);
  },
};

const app = angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'ui-notification',
  'ngResource',
  'ng-token-auth',
  'templates',
  'ngAnimate',
  'angular-loading-bar',
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
        resolve: { auth: Utils.validateUser },
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
        resolve: { auth: Utils.validateUser },
      })
      .state({
        name: 'reasons',
        url: '/reasons',
        templateUrl: 'reasons/index.html',
        controller: 'ReasonsController as $ctrl',
        resolve: { auth: Utils.validateUser },
      })
      .state({
        name: 'cases',
        url: '/cases',
        templateUrl: 'cases/index.html',
        controller: 'CasesController as $ctrl',
        resolve: { auth: Utils.validateUser },
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
])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}]);

app.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('auth:login-success', function() {
    $location.path('/');
  });
  $rootScope.$on('auth:logout-success', function() {
    $location.path('/sign_in');
  });
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    if (error && error.reason === 'unauthorized') {
      event.preventDefault();
      $location.path('/sign_in');
    }
  });
}]);

window.app = app;
