var logoutController = function ($state, authService, AUTH_EVENTS) {
    var vm = this;

    vm.logout = function() {
        authService.logout();
        $state.$emit(AUTH_EVENTS.loggedOut);
        $state.transitionTo('login-demo', {}, { reload: true });
    }
}

logoutController.$inject = ['$state', 'authService', 'AUTH_EVENTS'];


module.exports = logoutController;
