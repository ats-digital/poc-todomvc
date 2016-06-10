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
        templateUrl: '/views/todo/index.html'
    });
}]);