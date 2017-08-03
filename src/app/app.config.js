var config = function ($stateProvider, $urlRouterProvider, $translateProvider, $translatePartialLoaderProvider) {
    // send to 'showcase' page

  $urlRouterProvider.otherwise('/showcase');

  /*
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("main.dash");
  });
  */

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

config.$inject = ['$stateProvider', '$urlRouterProvider', '$translateProvider', '$translatePartialLoaderProvider'];

module.exports = config;
