var run = function($rootScope, loggingService) {
    loggingService.debug("app.shared.i18n module boostrapped!");
};

run.$inject = ['$rootScope','loggingService'];

module.exports = run;
