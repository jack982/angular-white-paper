var config = function ($logProvider) {
    $logProvider.debugEnabled(true); //FIXME : turn on/off depending by build/runtime config parameter
};

config.$inject = ['$logProvider'];

module.exports = config;
