var angular = require('angular');


angular
     .module('app.shared.i18n', ['pascalprecht.translate'])
      .config( require('./i18n.config.js'))
      .service('i18nService', require('./i18n.service.js'))
      .controller('i18nController', require('./i18n.controller.js'))
      .run( require('./i18n.run.js') );


