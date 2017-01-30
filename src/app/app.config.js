var config = function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('feature1', {
        url: '/feature1',
        views: {
            'main': {
                templateUrl: 'app/components/feature1/feature1.tpl.html',
                controller: 'feature1',
                controllerAs: 'vm'
            }
        }
    });

    // send to feature1 page
    $urlRouterProvider.otherwise("/feature1");
};

module.exports = config;