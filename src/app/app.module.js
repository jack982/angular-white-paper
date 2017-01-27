'use strict';

require('angular');
require('angular-ui-router');
require('./app.config.js');
require('./components/feature1/feature1.module.js');



angular.module('app', ['ui.router', 'feature1']);


