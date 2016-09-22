angular.module('app.resources')
  .factory('Bill', ['$resource',
    function($resource) {
      return $resource('/api/bills/:id', { id: '@id' }, {
        'update': { method: 'PUT' }
      });
    }
  ])
  .factory('LastBill', ['$http', 'Bill',
    function($http, Bill) {
      return {
        get: function() {
          return $http({
            method: 'GET',
            url: '/api/last_bill'
          }).then(function(resp) {
            var bill = resp.data;
            bill.date = Utils.strToDate(resp.data.date);
            bill.id = null;
            return new Bill(bill);
          })
        }
      };
    }
  ]);
