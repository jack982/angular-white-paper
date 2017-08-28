var angular = require('angular');

angular
     .module('app.notification-demo', ['app.shared.notification'])
        .config(require('./notification-demo.config.js'))
        .controller('notificationDemoCtrl', require('./notification-demo.controller.js'));
