var config = function ($stateProvider) {
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
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader',
                                            function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('showcase');
                        return $translate.refresh();
                }]
            }
        });
};

config.$inject = ['$stateProvider'];

module.exports = config;