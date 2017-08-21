var angular = require('angular');

//require('angular-ui-router');

require('../../shared');
require('../../shared/logger');

angular
     .module('app.showcase', ['ui.router',
                                 'pascalprecht.translate', 
                                 'ngCookies', 
                                 'app.shared', 
'app.shared.logger'])
        .config(require('./showcase.config.js'))
        .service('featuresService', require('./features.service.js'))
        .controller('showcase', require('./showcase.controller.js'));
