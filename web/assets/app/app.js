/**
 * Get api path
 *
 * @param {string} path
 *
 * @return {string}
 */
function getApiPath(path) {
    var apiPath = '/api';

    if (env === 'dev') {
        apiPath = '/app_dev.php/api';
    }

    return apiPath + path;
}

// Declare app level module which depends on views, and components
angular.module('app', [
    // Angular modules
    'ui.router',
    'ngResource'
]);