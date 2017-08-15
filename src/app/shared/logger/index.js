var angular = require('angular');


angular
     .module('app.shared.logger', [])
      .config( require('./logger.config.js'))
      .service('loggingService', require('./logger.service.js'))
      .run( require('./logger.run.js') );


