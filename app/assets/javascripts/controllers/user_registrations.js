angular.module('app')
  .controller('UserRegistrationsController', ['$scope', '$auth',
    function ($scope, $auth) {
      $scope.handleRegBtnClick = function() {
        $auth.submitRegistration($scope.registrationForm)
          .then(function() {
            $auth.submitLogin({
              email: $scope.registrationForm.email,
              password: $scope.registrationForm.password
            });
          });
      };
    }]);
