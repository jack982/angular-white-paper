var run = function($rootScope, loggerService) {
    loggerService.debug("app.shared.logout module boostrapped!");
};

run.$inject = ['$rootScope','loggerService'];

module.exports = run;
