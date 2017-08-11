var angular = require('angular');

//require('angular-ui-router');

angular
     .module('app.shared.notification', ['toaster'])
	 .config(require('./notification.config.js'))
     .service('notificationService', require('./notification.service.js'))
     .run(require('./notification.run.js'));

