angular.module('app.resources')
  .factory('Bill', function($resource) {
      return $resource('/api/bills/:id', { id: '@id' }, {
        'update': { method: 'PUT' }
      });
  });
