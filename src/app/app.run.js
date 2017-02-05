var run = function($rootScope, $translate) {
    $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
        console.log('$translatePartialLoaderStructureChanged');
        $translate.refresh();
    });
};

module.exports = run;