var run = function($rootScope, notificationService) {

    notificationService.notify("Auth module bootstrapped!");

};

run.$inject = ['$rootScope','notificationService'];

module.exports = run;
