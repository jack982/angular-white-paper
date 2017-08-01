var run = function($rootScope, $translate, notificationService) {
    
    $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
        console.log('$translatePartialLoaderStructureChanged');
        $translate.refresh();
    });
    
    notificationService.notify("Application bootstrapped!");
    
};

run.$inject = ['$rootScope','$translate','notificationService'];

module.exports = run;