function authDemoCtrl($scope, notificationService) {
    'use strict';

    var vm = this;


};

function loginDemoCtrl($scope, notificationService) {
    'use strict';

    var vm = this;


};



authDemoCtrl.$inject = ['$scope','notificationService'];
loginDemoCtrl.$inject = ['$scope','notificationService'];


module.exports = {
    'authDemoCtrl': authDemoCtrl,
    'loginDemoCtrl': loginDemoCtrl
};
