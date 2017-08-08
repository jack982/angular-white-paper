var run = function ($rootScope, $translate, $state, notificationService, AUTH_EVENTS, authService) {

  $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
    console.log('$translatePartialLoaderStructureChanged');
    $translate.refresh();
  });



  $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
    console.log('AUTH_EVENT.notAuthenticated');
    authService.logout();
    $rootScope.setCurrentUsername( undefined );
    notificationService.error("You aren't authenticated. Please login.", "Authentication error");
    $state.go('login-demo');
  });

  $rootScope.$on(AUTH_EVENTS.notAuthorized, function () {
    console.log('AUTH_EVENT.notAuthorized');
    notificationService.error("You haven't the required role to access the requested page.", "Authorization error");
  });

  $rootScope.$on(AUTH_EVENTS.loggedIn, function() {
    var currentUser = authService.username();
    $rootScope.setCurrentUsername( currentUser );
  });

  $rootScope.$on(AUTH_EVENTS.loggedOut, function() {
    $rootScope.setCurrentUsername( undefined );
    $state.go('login-demo', {}, { reload: true });
  });

  $rootScope.setCurrentUsername = function (name) {
    $rootScope.currentUser = name;
    console.log("set username: " + name);
  };

  $rootScope.currentUser = authService.username();


  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !authService.isAuthenticated()){
      // User isn’t authenticated
      $rootScope.$emit(AUTH_EVENTS.notAuthenticated);
      event.preventDefault();
    }
    
    if ( toState.data !== undefined && toState.data.roles !== undefined && !authService.isAuthorized( toState.data.roles )) {
        // User isn't authorized
        $rootScope.$emit(AUTH_EVENTS.notAuthorized);
        $state.go($state.current, {}, {reload:true});
        event.preventDefault();
    }

    if(toState.name == 'login-demo' && authService.isAuthenticated()) {
      event.preventDefault();
    }
  });


/*
// DUMMY BACKEND for faking request response codes
 $httpBackend.whenGET('http://localhost:8080/valid')
        .respond({message: 'This is a valid response!'});
  $httpBackend.whenGET('http://localhost:8080/notauthenticated')
        .respond(401, {message: "Not Authenticated"});
  $httpBackend.whenGET('http://localhost:8080/notauthorized')
        .respond(403, {message: "Not Authorized"});


*/
  notificationService.notify("Application bootstrapped!");

};

        
run.$inject = ['$rootScope', '$translate', '$state', 'notificationService', 'AUTH_EVENTS', 'authService'];

module.exports = run;
