angular.module('app.resources')
  .factory('Bill', ['$resource',
    function($resource) {
        return $resource('/api/bills/:id', { id: '@id' }, {
          'update': { method: 'PUT' }
        });
    }
  ]);
