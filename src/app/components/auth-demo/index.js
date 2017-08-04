var angular = require('angular');

//require('angular-ui-router');

angular
     .module('app.auth-demo', ['app.shared.auth'])
        .config(require('./auth-demo.config.js'))
        .controller('authDemoCtrl', require('./auth-demo.controller.js')['authDemoCtrl'])
        .controller('authDemoAdminCtrl', require('./auth-demo.controller.js')['authDemoAdminCtrl'])
        .controller('loginDemoCtrl', require('./auth-demo.controller.js')['loginDemoCtrl']);
