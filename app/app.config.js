(function(){

  'use strict';

  angular.module('app')
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('init', {
          url: '/',
          views: {
            'main': {
              template: '<h2>{{vm.title}}</h2>',
              controller: 'app',
              controllerAs: 'vm'
            }
          }
        });


     // send to index page
    $urlRouterProvider.otherwise("/");
    });

})();

