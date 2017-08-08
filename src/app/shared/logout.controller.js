var logoutController = function ($scope, $state, authService, AUTH_EVENTS) {
    var vm = this;

    vm.logout = function() {
        authService.logout();
        $scope.$emit(AUTH_EVENTS.loggedOut);
       //
    }
}

logoutController.$inject = ['$scope', '$state', 'authService', 'AUTH_EVENTS'];


module.exports = logoutController;
