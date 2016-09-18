angular.module('app.resources')
  .factory('Summary', ['$resource',
    function($resource) {
      return $resource('/api/summary');
    }
  ]);
