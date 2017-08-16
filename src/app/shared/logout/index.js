var angular = require('angular');


angular
     .module('app.shared.logout', ['app.shared.logger'])
      .config( require('./logout.config.js'))
      .controller('logoutController', require('./logout.controller.js'))
      .run( require('./logout.run.js') );


