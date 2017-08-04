var config = function ($stateProvider, AUTH_ROLES) {
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
            authenticate: true,
            data: {
                roles: [ AUTH_ROLES.admin, AUTH_ROLES.public ]
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader',
                                            function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('auth-demo');
                        return $translate.refresh();
                }]
            }
        })
      .state('auth-demo-admin', {
            url: '/protectedAdmin',
            views: {
                'main': {
                    templateUrl: 'app/components/auth-demo/protectedAdmin.tpl.html',
                    controller: 'authDemoAdminCtrl',
                    controllerAs: 'vm'
                }
            },
            authenticate: true,
            data: {
                roles: [ AUTH_ROLES.admin ]
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
            authenticate: false,
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader',
                                            function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('auth-demo');
                        return $translate.refresh();
                }]
            }
        });
};

config.$inject = ['$stateProvider', 'AUTH_ROLES'];

module.exports = config;
