angular.module('app')

.config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider',
        function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    // Match trailing slashes, as part of url.
    $urlMatcherFactoryProvider.strictMode(false);

    $urlRouterProvider
    .when('', '/todo')
    .when('/', '/todo')
    .otherwise('/404');

    $stateProvider
    .state('todo', {
        url: '/todo',
        controller: 'TodoCtrl',
        templateUrl: '/views/todo/todo-index.html'
    })
    .state('access_denied', {
        url: '/403',
        templateUrl: '/views/403.html'
    })
    .state('not_found', {
        url: '/404',
        templateUrl: '/views/404.html'
    });
}]);