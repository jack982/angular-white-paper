var run = function($rootScope, loggingService) {
    loggingService.debug("app.shared.notification module boostrapped!");
};

run.$inject = ['$rootScope', 'loggingService'];

module.exports = run;
