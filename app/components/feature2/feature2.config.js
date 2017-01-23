(function(){

  'use strict';

  angular.module('feature2')
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('feature2', {
          url: '/feature2',
          views: {
            'main': {
              templateUrl: 'app/components/feature2/feature2.tpl.html',
              controller: 'feature2',
              controllerAs: 'vm'
            }
          }
        });
    });

})();

