var run = function ($rootScope, $translate, $state, notificationService, AUTH_EVENTS, authService) {

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

  $rootScope.$on(AUTH_EVENTS.loggedIn, function() {
    var currentUser = authService.username();
    $rootScope.setCurrentUsername( currentUser );
  });

  $rootScope.$on(AUTH_EVENTS.loggedOut, function() {
    $rootScope.setCurrentUsername( undefined );
  });

  $rootScope.setCurrentUsername = function (name) {
    $rootScope.currentUser = name;
    console.log("set username: " + name);
  };

  $rootScope.currentUser = authService.username();


  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !authService.isAuthenticated()){
      // User isn’t authenticated
      $state.transitionTo("login-demo");
      event.preventDefault();
    }
    
    if ( toState.data !== undefined && toState.data.roles !== undefined && !authService.isAuthorized( toState.data.roles )) {
        event.preventDefault();
        notificationService.error("You haven't the required role to access the requested page.", "Authorization error");
    }

    if(toState.name == 'login-demo' && authService.isAuthenticated()) {
      event.preventDefault();
    }
  });

  notificationService.notify("Application bootstrapped!");

};

run.$inject = ['$rootScope', '$translate', '$state', 'notificationService', 'AUTH_EVENTS', 'authService'];

module.exports = run;
