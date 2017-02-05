var angular = require('angular');

angular
     .module('shared', [] ) //['ui.router', 'pascalprecht.translate', 'ngCookies'])
        .config(require('./shared.config.js'))
        .service('helloService', require('./hello.service.js'))
        .service('i18nService', require('./i18n.service.js'));
        //.controller('feature1', require('./feature1.controller.js'));