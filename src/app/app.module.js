angular = require('angular');

// app dependencies
require('angular-ui-router');
require('angular-cookies');
require('angular-translate');
require('angular-translate-loader-static-files');
require('angular-translate-loader-partial');
require('angular-translate-storage-local');
require('angular-translate-storage-cookie');


// add shared and commons dependencies
require('./app.constants.js');
require('./shared');

// add here all custom applications' dependencies
require('./components/showcase');

angular.module('angularWhitePaper', ['ui.router',
                                        'pascalprecht.translate',
                                        'ngCookies',
                                        'app.constants',
                                        'app.shared',
                                        'app.showcase'])
    .config( require('./app.config.js') )
    .run( require('./app.run.js') );



