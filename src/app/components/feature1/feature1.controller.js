var feature1 = function ($scope, featuresService) {
    var vm = this;
    vm.title = 'feature1';

    vm.features = featuresService.list();

    vm.item = null;

    vm.addItem = function () {
        featuresService.add(vm.item);
        vm.item = null;
    }
};

// feature1.$inject = ['$scope', 'featuresService'];

module.exports = feature1;