var run = function($rootScope, loggingService) {
    loggingService.debug("app.shared.logout module boostrapped!");
};

run.$inject = ['$rootScope','loggingService'];

module.exports = run;
