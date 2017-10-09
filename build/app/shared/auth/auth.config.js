var config = function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
};


config.$inject = ['$httpProvider'];

module.exports = config;
