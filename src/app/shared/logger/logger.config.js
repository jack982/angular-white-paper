var config = function ($logProvider, APP_CONSTANTS) {
    $logProvider.debugEnabled( APP_CONSTANTS.DEBUG_ENABLED );
};

config.$inject = ['$logProvider', 'APP_CONSTANTS'];

module.exports = config;
