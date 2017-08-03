var run = function ($rootScope, $translate, notificationService, AUTH_EVENTS, authService) {

  $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
    console.log('$translatePartialLoaderStructureChanged');
    $translate.refresh();
  });



  $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
    console.log('AUTH_EVENT.notAuthenticated');
  });

  $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
    console.log('AUTH_EVENT.notAuthorized');
  });



  $rootScope.setCurrentUsername = function (name) {
    $rootScope.username = name;
  };

  //$rootScope.username = authService.username();


  notificationService.notify("Application bootstrapped!");

};

run.$inject = ['$rootScope', '$translate', 'notificationService', 'authService'];

module.exports = run;
