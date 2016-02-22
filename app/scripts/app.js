'use strict';

angular.module('angularAppApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute']).config(function ($routeProvider, $locationProvider) {
    $routeProvider

        // One and the only route: /
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })

        .otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
});
