var angular = require('angular');

angular
     .module('app.shared', [] ) //['ui.router', 'pascalprecht.translate', 'ngCookies'])
        .config(require('./shared.config.js'))
        .controller('logoutController', require('./logout.controller.js'))
        .service('helloService', require('./hello.service.js'))
        .service('i18nService', require('./i18n.service.js'))
        .controller('i18nController', require('./i18n.controller.js'));
