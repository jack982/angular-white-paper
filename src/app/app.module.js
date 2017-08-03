angular = require('angular');

// app dependencies
require('angular-ui-router');
require('angular-cookies');
require('angular-translate');
require('angular-translate-loader-static-files');
require('angular-translate-loader-partial');
require('angular-translate-storage-local');
require('angular-translate-storage-cookie');
require('angularjs-toaster');
require('angular-animate');


// add shared and commons dependencies
require('./app.constants.js');
require('./shared');
require('./shared/notification');
require('./shared/auth');

// add here all custom applications' dependencies
require('./components/showcase');
require('./components/notification-demo');
require('./components/auth-demo');


angular.module('angularWhitePaper', [ 'ngAnimate','ui.router',
                                        'pascalprecht.translate',
                                        'ngCookies',
                                        'ngAnimate',
                                        'toaster',
                                        'app.constants',
                                        'app.shared',
                                        'app.shared.auth',
                                        'app.shared.notification',
                                        'app.showcase',
                                        'app.notification-demo',
                                        'app.auth-demo'])
    .config( require('./app.config.js') )
    .controller( require('./app.controller.js') )
    .run( require('./app.run.js') );



