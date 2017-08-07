function authDemoCtrl($scope, notificationService) {
    'use strict';

    var vm = this;

};

function authDemoAdminCtrl($scope, notificationService) {
    'use strict';
    
    var vm = this;
};

function loginDemoCtrl($scope, $state, notificationService, authService, AUTH_EVENTS) {
    'use strict';

    var vm = this;

    vm.user = {};

    vm.login = function () {
        authService.login(vm.user.username, vm.user.password).then(function (authenticated) {
            $scope.$emit(AUTH_EVENTS.loggedIn);
            $state.go('auth-demo', {}, { reload: true });
            //  $scope.setCurrentUsername(data.username);
           
        }, function (err) {
            notificationService.error("Check your credentials", "Login failed");
        });
    }
};



authDemoCtrl.$inject = ['$scope', 'notificationService'];
authDemoAdminCtrl.$inject = ['$scope', 'notificationService'];
loginDemoCtrl.$inject = ['$scope', '$state', 'notificationService', 'authService', 'AUTH_EVENTS'];


module.exports = {
    'authDemoCtrl': authDemoCtrl,
    'authDemoAdminCtrl': authDemoAdminCtrl,
    'loginDemoCtrl': loginDemoCtrl
};
