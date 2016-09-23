angular.module('app.resources')
  .factory('Download', ['$http', '$window', '$rootScope',
    function($http, $window, $rootScope) {
      function post ($ctrl) {
        return $http({
          method: 'POST',
          url: '/api/downloads',
        }).then(function(resp) {
          var download = resp.data;
          var query = queryDates($ctrl.startday, $ctrl.endday);
          var filename = convertToSlug(($rootScope.user.name || 'billings'));
          var url = '/downloads/' + download.user_id + '/'  + download.token
                    + '/' + filename + '.xlsx' + query;

          $window.open(url, '_blank');
        });
      }
      return {
        post: post,
      };
    }
  ]);

function queryDates(startday, endday) {
  const start = startday.toISOString();
  const end = endday.toISOString();
  return '?startday=' + start + '&endday=' + end;
}

function convertToSlug(text) {
  return text
    .toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'');
}
