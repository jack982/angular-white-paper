var angular = require('angular');

angular
     .module('app.shared.notification', ['toaster', 'app.shared.logger'])
	 .config(require('./notification.config.js'))
     .service('notificationService', require('./notification.service.js'))
       .run( require('./notification.run.js') );

