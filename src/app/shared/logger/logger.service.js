var logger = function ($log) {

    return {
        'log': function (msg) {
            $log.log(msg);
        },
        'debug': function (msg) {
            $log.debug(msg);
        },
        'info': function (msg) {
            $log.info(msg);
        },
        'warn': function (msg) {
            $log.warn(msg);
        },
        'error': function (msg) {
            $log.error(msg);
        }
    };
};

logger.$inject = ['$log'];

module.exports = logger;