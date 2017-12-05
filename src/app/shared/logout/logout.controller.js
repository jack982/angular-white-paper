var logoutController = function ($scope, authService, AUTH_EVENTS, SweetAlert) {
    var vm = this;

    vm.logout = function() {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Do you really want to logout?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, log me out!",
            closeOnConfirm: true}, 
            function(isConfirm){ 
                if (isConfirm) {
                    authService.logout();
                    $scope.$emit(AUTH_EVENTS.loggedOut);
                } 
         });
    }
}

logoutController.$inject = ['$scope', 'authService', 'AUTH_EVENTS', 'SweetAlert'];


module.exports = logoutController;
