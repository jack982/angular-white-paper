  angular = require('angular');
 //   require('./feature1.config.js');


  angular.module('feature1', [])

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





   require('./feature1.controller.js');
    //require('./features.service.js');
