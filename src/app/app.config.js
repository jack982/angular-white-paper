var config = function ($stateProvider, $urlRouterProvider, $translateProvider) {
    // send to feature1 page
    $urlRouterProvider.otherwise("/feature1");
    
    // translate
    //$translateProvider.translations('en', { HEADLINE: 'Hello there, This is my awesome app!' })
    //    .translations('de', { HEADLINE: 'Hey, das ist meine großartige App!' });
    $translateProvider.useStaticFilesLoader({
        files: [
            {
                 prefix: './i18n/feature1-',
                 suffix: '-i18n.json'
            }
        ]
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
    //$translateProvider.determinePreferredLanguage();
};

module.exports = config;