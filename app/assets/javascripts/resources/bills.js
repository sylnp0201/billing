angular.module('app.resources')
  .factory('Bill', ['$resource',
    function($resource) {
        window.$resource = $resource;
        return $resource('/api/bills/:id', { id: '@id' }, {
          'update': { method: 'PUT' }
        });
    }
  ]);
