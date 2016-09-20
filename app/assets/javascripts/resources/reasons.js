angular.module('app.resources')
  .factory('Reason', ['$resource',
    function($resource) {
        return $resource('/api/reasons/:id', { id: '@id' }, {
          'update': { method: 'PUT' }
        });
    }
  ]);
