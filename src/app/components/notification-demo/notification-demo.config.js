var config = function ($stateProvider) {
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
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader',
                                            function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('notification-demo');
                        return $translate.refresh();
                }]
            }
        });
};

config.$inject = ['$stateProvider'];

module.exports = config;
