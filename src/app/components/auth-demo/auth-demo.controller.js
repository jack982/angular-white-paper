function authDemoCtrl($scope, $http, notificationService) {
    'use strict';

    var vm = this;

    vm.response = undefined;
    
    vm.performValidRequest = function() {
        $http.get('https://httpbin.org/status/200').then(function(result) {
            vm.response = result;
        }, function(err) {
            // no error here
        }).catch( function() {});
    };

    vm.performNotAuthenticatedRequest = function() {
         $http.get('https://httpbin.org/status/401').then(function(result) {
            // no response here
        }, function(err) {
            vm.response = err;
        }).catch( function() {});
    };

    vm.performNotAuthorizedRequest = function() {
        $http.get('https://httpbin.org/status/403').then(function(result) { 
            // no response here
        }, function(err) {
            vm.response = err;
        }).catch( function() {});
    };


};

function authDemoAdminCtrl($scope, notificationService) {
    'use strict';
    
    var vm = this;
};

function loginDemoCtrl($scope, $state, notificationService, authService, AUTH_EVENTS) {
    'use strict';

    var vm = this;

    vm.loginError = false;
    vm.user = {};

    vm.login = function () {
        authService.login(vm.user.username, vm.user.password).then(function (authenticated) {
            vm.loginError = false;
            $scope.$emit(AUTH_EVENTS.loggedIn);
            $state.go('auth-demo', {}, { reload: true });
            //  $scope.setCurrentUsername(data.username);
           
        }, function (err) {
            vm.loginError = true;
            notificationService.error("Check your credentials", "Login failed");
        });
    }
};



authDemoCtrl.$inject = ['$scope', '$http', 'notificationService'];
authDemoAdminCtrl.$inject = ['$scope', 'notificationService'];
loginDemoCtrl.$inject = ['$scope', '$state', 'notificationService', 'authService', 'AUTH_EVENTS'];


module.exports = {
    'authDemoCtrl': authDemoCtrl,
    'authDemoAdminCtrl': authDemoAdminCtrl,
    'loginDemoCtrl': loginDemoCtrl
};
