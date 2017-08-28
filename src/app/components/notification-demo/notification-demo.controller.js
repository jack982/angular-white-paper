function notificationDemoCtrl(notificationService) {
    'use strict';

    var vm = this;

    vm.notify = function (type) {

      switch(type) {
        case 'success':
            notificationService.success("Success message","Success");
            break;
        case 'info':
            notificationService.info("Info message","Info");
            break;
        case 'error':
            notificationService.error("Error message","Error");
            break;
        case 'warning':
            notificationService.warn("Warning message","Warning");
            break;
      }
  };

}

notificationDemoCtrl.$inject = ['notificationService'];

module.exports = notificationDemoCtrl;
