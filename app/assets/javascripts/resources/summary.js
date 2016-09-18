angular.module('app.resources')
  .factory('Summary', function($resource) {
    return $resource('/api/summary');
  });
