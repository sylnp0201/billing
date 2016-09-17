angular.module('app.resources')
  .factory('Case', function($resource) {
      return $resource('/api/cases/:id', { id: '@id' }, {
        'update': { method: 'PUT' }
      });
  });
