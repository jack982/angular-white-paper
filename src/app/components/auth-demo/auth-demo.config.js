var config = function ($stateProvider) {
    'use strict';
    $stateProvider
        .state('auth-demo', {
            url: '/protected',
            views: {
                'main': {
                    templateUrl: 'app/components/auth-demo/protected.tpl.html',
                    controller: 'authDemoCtrl',
                    controllerAs: 'vm'
                }
            },
            data: {

            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader',
                                            function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('auth-demo');
                        return $translate.refresh();
                }]
            }
        })

      .state('login-demo', {
            url: '/login',
            views: {
                'main': {
                    templateUrl: 'app/components/auth-demo/login.tpl.html',
                    controller: 'loginDemoCtrl',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader',
                                            function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('auth-demo');
                        return $translate.refresh();
                }]
            }
        });
};

config.$inject = ['$stateProvider'];

module.exports = config;
