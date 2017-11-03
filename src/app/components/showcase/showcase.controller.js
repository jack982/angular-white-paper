function showcase(featuresService) {
    'use strict';

    var vm = this;

    vm.features = featuresService.list();

    vm.item = null;

   
    vm.addItem = function () {
        featuresService.add(vm.item);
        vm.item = null;
    }; 

}

showcase.$inject = ['featuresService'];

module.exports = showcase;
