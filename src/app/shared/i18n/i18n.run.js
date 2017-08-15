var run = function($rootScope, loggerService) {
    loggerService.debug("app.shared.i18n module boostrapped!");
};

run.$inject = ['$rootScope','loggerService'];

module.exports = run;
