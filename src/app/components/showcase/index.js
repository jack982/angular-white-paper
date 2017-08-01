var angular = require('angular');

//require('angular-ui-router');

angular
     .module('app.showcase', ['ui.router', 'pascalprecht.translate', 'ngCookies', 'app.shared', 'app.shared.notification'])
        .config(require('./showcase.config.js'))
        .service('featuresService', require('./features.service.js'))
        .controller('showcase', require('./showcase.controller.js'));
