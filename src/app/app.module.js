angular = require('angular');

// app dependencies
require('angular-ui-router');
require('angular-cookies');
require('angular-translate');
require('angular-translate-loader-static-files');
require('angular-translate-loader-partial');
require('angular-translate-storage-local');
require('angular-translate-storage-cookie');
require('angular-animate');
require('angularjs-toaster');



// add shared and commons dependencies
require('./app.constants.js');
require('./shared');
require('./shared/logger');
require('./shared/i18n');
require('./shared/notification');
require('./shared/auth');
require('./shared/logout');

// add here all custom applications' dependencies
require('./components/showcase');
require('./components/notification-demo');
require('./components/auth-demo');


angular.module('angularWhitePaper', [ 'ngAnimate',
                                        'ui.router',
                                        'pascalprecht.translate',
                                        'ngCookies',
                                        'ngAnimate',
                                        'toaster',
                                        'app.constants',
                                        'app.shared',
                                        'app.shared.logger',
                                        'app.shared.i18n',
                                        'app.shared.auth',
                                        'app.shared.logout',
                                        'app.shared.notification',
                                        'app.showcase',
                                        'app.notification-demo',
                                        'app.auth-demo'])
    .config( require('./app.config.js') )
    .controller( 'AppController', require('./app.controller.js') )
    .run( require('./app.run.js') );



