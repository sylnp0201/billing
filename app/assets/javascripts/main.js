angular.module('app.controllers', []);
angular.module('app.resources', []);
angular.module('app.directives', []);

const app = angular.module('app', [
  'ui.router',
  'ngResource',
  'ng-token-auth',
  'templates',
  'app.resources',
  'app.controllers',
  'app.directives',
])
.config(['$locationProvider', '$stateProvider',
  function ($locationProvider, $stateProvider) {
    $stateProvider
      .state({
        name: 'home',
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeController',
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
      })
      .state({
        name: 'cases',
        url: '/cases',
        templateUrl: 'cases/index.html',
        controller: 'CasesController',
        resolve: { auth: ($auth) => $auth.validateUser() },
      });

    $locationProvider.html5Mode(true);
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
