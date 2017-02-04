var angular = require('angular');

//require('angular-ui-router');


angular
     .module('feature1', ['ui.router', 'pascalprecht.translate', 'ngCookies'])
        .config(require('./feature1.config.js'))
        .service('featuresService', require('./features.service.js'))
        .controller('feature1', require('./feature1.controller.js'));