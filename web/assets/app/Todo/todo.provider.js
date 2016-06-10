angular.module('app')

.factory('TodoProvider', ['$resource', function($resource) {
    return $resource(getApiPath('/todo/:id'), {id: '@id'}, {
        save: {
            url: getApiPath('/todo/save'),
            method: 'POST'
        },
        query: {
            url: getApiPath('/todo/list'),
            isArray: true
        },
        switchComplete: {
            url: getApiPath('/todo/switch-complete'),
            method: 'POST'
        },
        clearComplete: {
            url: getApiPath('/todo/clear-complete')
        }
    });
}]);