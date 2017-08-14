var run = function($rootScope,$log) {
    $log.debug("app.shared.logger module boostrapped!");
};

run.$inject = ['$rootScope','$log'];

module.exports = run;
