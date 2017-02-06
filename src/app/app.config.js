var config = function ($stateProvider, $urlRouterProvider, $translateProvider, $translatePartialLoaderProvider) {
    // send to 'showcase' page
    $urlRouterProvider.otherwise("/showcase");

    // translate
    /*
    $translateProvider.useStaticFilesLoader({
        files: [
            {
                 prefix: './i18n/showcase-',
                 suffix: '-i18n.json'
            }
        ]
    });
    */

    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: './i18n/{part}/{lang}.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
    //$translateProvider.determinePreferredLanguage();
};

module.exports = config;
