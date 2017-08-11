var angular = require('angular');

//require('angular-ui-router');

angular
     .module('app.shared.auth', [])
      .constant('AUTH_EVENTS', require('./auth.constants.js')['EVENTS'])
      .constant('AUTH_ROLES', require('./auth.constants.js')['ROLES'])
      .config( require('./auth.config.js'))
      .service('authService', require('./auth.service.js'))
      .factory('authInterceptor', require('./auth.interceptor.js'))
      .run( require('./auth.run.js') );
       // .config(require('./showcase.config.js'))
    //    .controller('showcase', require('./showcase.controller.js'))
    //      .service('notificationService', require('./notification.service.js'));

