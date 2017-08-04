var appCtrl = function(authService, AUTH_EVENTS) {

    /*

    $scope.$on(AUTH_EVENTS.notAuthenticated, function() {
        console.log('AUTH_EVENT.notAuthenticated');
    });

    $scope.$on(AUTH_EVENTS.notAuthorized, function() {
        console.log('AUTH_EVENT.notAuthorized');
    });
    */

   var vm = this;

   vm.currentUser = function() {
     return authService.username();
   }


};


appCtrl.$inject = ['authService', 'AUTH_EVENTS'];

module.exports = appCtrl;

