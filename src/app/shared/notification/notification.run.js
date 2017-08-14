var run = function($rootScope,loggerService) {
    loggerService.debug("app.shared.notification module boostrapped!");
};

run.$inject = ['$rootScope', 'loggerService'];

module.exports = run;
