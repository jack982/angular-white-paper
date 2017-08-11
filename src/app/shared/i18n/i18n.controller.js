function i18nController($translate) {
    var vm = this;
    
    vm.changeLocale = function(langKey) {
        $translate.use(langKey);
    }
}

i18nController.$inject = ['$translate'];


module.exports = i18nController;