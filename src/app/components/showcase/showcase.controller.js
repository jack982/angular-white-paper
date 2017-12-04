function showcase(featuresService, SweetAlert) {
    'use strict';

    var vm = this;

    vm.features = featuresService.list();

    vm.item = null;

    vm.addItem = function () {
        featuresService.add(vm.item);
        vm.item = null;
    }; 

    vm.swal = function() {
        SweetAlert.swal("soon will be sweet");
    };
}

showcase.$inject = ['featuresService', 'SweetAlert'];

module.exports = showcase;
