var config = function ($stateProvider, $urlRouterProvider) {
    // send to feature1 page
    $urlRouterProvider.otherwise("/feature1");
};

module.exports = config;