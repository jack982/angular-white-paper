var angular = require('angular');

angular
     .module('app.shared', [] ) //['ui.router', 'pascalprecht.translate', 'ngCookies'])
        .config(require('./shared.config.js'));