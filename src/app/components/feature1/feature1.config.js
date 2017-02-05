var config = function ($stateProvider, $urlRouterProvider, $translatePartialLoaderProvider) {
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
       /*,
        resolve: {
            part: function() {
                $translatePartialLoaderProvider.addPart('feature1');
                return;
            }
        }
        */
    });
};


module.exports = config;