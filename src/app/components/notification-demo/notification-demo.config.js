var config = function ($stateProvider,$translatePartialLoaderProvider) {
    'use strict';
    $stateProvider
        .state('notification-demo', {
            url: '/notifications',
            views: {
                'main': {
                    templateUrl: 'app/components/notification-demo/notification-demo.tpl.html',
                    controller: 'notificationDemoCtrl',
                    controllerAs: 'vm'
                }
            }/*,
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader',
                                            function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('notification-demo');
                        return $translate.refresh();
                }]
            }
            */
        });
        
        $translatePartialLoaderProvider.addPart('app/components/notification-demo');
};

config.$inject = ['$stateProvider', '$translatePartialLoaderProvider'];

module.exports = config;
