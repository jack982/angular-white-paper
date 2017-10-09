var config = function ($stateProvider, $translatePartialLoaderProvider) {
    'use strict';
    $stateProvider
        .state('showcase', {
            url: '/showcase',
            views: {
                'main': {
                    templateUrl: 'app/components/showcase/showcase.tpl.html',
                    controller: 'showcase',
                    controllerAs: 'vm'
                }
            }/*,
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader',
                                            function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('showcase');
                        return $translate.refresh();
                }]
            }
            */
        });

    $translatePartialLoaderProvider.addPart('app/components/showcase');
};

config.$inject = ['$stateProvider', '$translatePartialLoaderProvider'];

module.exports = config;