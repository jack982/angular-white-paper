function showcase($scope, featuresService, helloService,  $translate) {
    var vm = this;
    vm.title = 'showcase';

    vm.features = featuresService.list();

    vm.item = null;

    vm.greeting = helloService.hello();

    vm.addItem = function () {
        featuresService.add(vm.item);
        vm.item = null;
    };

    vm.changeLanguage = function(langKey) {
        $translate.use(langKey);
    };
};

// showcase.$inject = ['$scope', 'featuresService'];

module.exports = showcase;
