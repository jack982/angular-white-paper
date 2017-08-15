var run = function($rootScope, loggingService) {

    loggingService.debug("app.shared.auth module bootstrapped!");

};

run.$inject = ['$rootScope', 'loggingService'];

module.exports = run;
