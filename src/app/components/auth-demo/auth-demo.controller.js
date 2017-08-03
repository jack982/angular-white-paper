function authDemoCtrl($scope, notificationService) {
    'use strict';

    var vm = this;




};

function loginDemoCtrl($scope, notificationService, authService) {
    'use strict';

    var vm = this;

    vm.user = {};

    vm.login = function () {
        authService.login(vm.user.username, vm.user.password).then(function (authenticated) {
            $state.go('auth-demo', {}, {
                reload: true
            });
            //  $scope.setCurrentUsername(data.username);
        }, function (err) {
            notificationService.error("Check your credentials", "Login failed");
        });
    }
};



authDemoCtrl.$inject = ['$scope', 'notificationService'];
loginDemoCtrl.$inject = ['$scope', 'notificationService', 'authService'];


module.exports = {
    'authDemoCtrl': authDemoCtrl,
    'loginDemoCtrl': loginDemoCtrl
};
