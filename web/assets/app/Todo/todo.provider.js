angular.module('app')

    .factory('TodoProvider', ['$resource', function($resource) {
        return $resource(getApiPath('/todo/:id'), {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
}]);