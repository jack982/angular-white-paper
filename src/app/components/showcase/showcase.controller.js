function showcase($scope, featuresService, helloService, notificationService) {
    'use strict';

    var vm = this;
    vm.title = 'showcase';


    vm.features = featuresService.list();

    vm.item = null;

    vm.greeting = helloService.hello();

    vm.addItem = function () {
        featuresService.add(vm.item);
        vm.item = null;
    };

  vm.notify = function() {
    notificationService.notify("ciaooo");
  };
}

showcase.$inject = ['$scope', 'featuresService', 'helloService','notificationService'];

module.exports = showcase;
