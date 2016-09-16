angular.module('app.controllers', []);
angular.module('app.resources', []);

var app = angular.module('app', [
  'ngRoute',
  'ngResource',
  'ng-token-auth',
  'templates',
  'app.resources',
  'app.controllers',
]).config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'HomeController'
      })
      .when('/sign_in', {
        templateUrl: 'user_sessions/new.html',
        controller: 'UserSessionsController'
      })
      .when('/sign_up', {
        templateUrl: 'user_registrations/new.html',
        controller: 'UserRegistrationsController'
      })
      .otherwise({ redirectTo: '/' });
    $locationProvider.html5Mode(true);
  }
]);

app.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('auth:login-success', function() {
    $location.path('/');
  });
}]);
