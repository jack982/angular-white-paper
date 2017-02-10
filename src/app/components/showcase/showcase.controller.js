function showcase($scope, featuresService, helloService) {
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
}

showcase.$inject = ['$scope', 'featuresService', 'helloService'];

module.exports = showcase;
