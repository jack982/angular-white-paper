var config = function ($stateProvider, $urlRouterProvider, $translateProvider, $translatePartialLoaderProvider) {
    // send to feature1 page
    $urlRouterProvider.otherwise("/feature1");
    
    // translate
    /*
    $translateProvider.useStaticFilesLoader({
        files: [
            {
                 prefix: './i18n/feature1-',
                 suffix: '-i18n.json'
            }
        ]
    });
    */
    $translatePartialLoaderProvider.addPart('feature1');
    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: './i18n/{part}/{lang}.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
    //$translateProvider.determinePreferredLanguage();
};

module.exports = config;