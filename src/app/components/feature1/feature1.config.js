 angular = require('angular');

  angular.module('feature1')
    .config(function ($stateProvider, $urlRouterProvider) {
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
    });


