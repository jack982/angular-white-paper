angular = require('angular');

// app dependencies
require('angular-ui-router');
require('angular-cookies');
require('angular-translate');
require('angular-translate-loader-static-files');
require('angular-translate-storage-local');
require('angular-translate-storage-cookie');

// add here all custom applications' dependencies
require('./components/feature1');

angular.module('angularWhitePaper', ['ui.router',
                                        'pascalprecht.translate',
                                        'ngCookies',
                                        'feature1'])
    .config( require('./app.config.js') ); 



