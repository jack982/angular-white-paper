angular = require('angular');


require('angular-ui-router');

// add here all applications' dependencies
require('./components/feature1');


angular.module('app', ['ui.router', 'feature1'])
    .config( require('./app.config.js') ); 



