(function () {

    'use strict';

    angular.module('app')
        .config(function ($stateProvider, $urlRouterProvider) {

            // send to feature1 page
            $urlRouterProvider.otherwise("/feature1");
        });

})();
