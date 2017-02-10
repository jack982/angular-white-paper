var run = function($rootScope, $translate) {
    $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
        console.log('$translatePartialLoaderStructureChanged');
        $translate.refresh();
    });
};

run.$inject = ['$rootScope','$translate'];

module.exports = run;