function feature1($scope, featuresService, helloService, $translate, $translatePartialLoader) {
    $translatePartialLoader.addPart('feature1');
    $translate.refresh();
    
    var vm = this;
    vm.title = 'feature1';

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

// feature1.$inject = ['$scope', 'featuresService'];

module.exports = feature1;