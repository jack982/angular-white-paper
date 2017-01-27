angular = require('angular');

require('angular-ui-router');
//require('./app.config.js');
require('./components/feature1/feature1.module.js');


angular.module('app', ['ui.router', 'feature1'])

    .config(function ($stateProvider, $urlRouterProvider) {

            // send to feature1 page
            $urlRouterProvider.otherwise("/feature1");
        });



