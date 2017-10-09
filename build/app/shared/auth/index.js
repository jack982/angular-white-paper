var angular = require('angular');

angular
     .module('app.shared.auth', ['app.shared.logger'])
      .constant('AUTH_EVENTS', require('./auth.constants.js')['EVENTS'])
      .constant('AUTH_ROLES', require('./auth.constants.js')['ROLES'])
      .config( require('./auth.config.js'))
      .service('authService', require('./auth.service.js'))
      .factory('authInterceptor', require('./auth.interceptor.js'))
      .run( require('./auth.run.js') );

