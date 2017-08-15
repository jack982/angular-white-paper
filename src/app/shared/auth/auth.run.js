var run = function($rootScope, loggerService) {

    loggerService.debug("app.shared.auth module bootstrapped!");

};

run.$inject = ['$rootScope', 'loggerService'];

module.exports = run;
