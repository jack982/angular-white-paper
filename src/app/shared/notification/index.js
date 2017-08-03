var angular = require('angular');

//require('angular-ui-router');

angular
     .module('app.shared.notification', ['toaster'])
	// .config(require('./showcase.config.js'))
    //    .controller('showcase', require('./showcase.controller.js'))
          .service('notificationService', require('./notification.service.js'));

