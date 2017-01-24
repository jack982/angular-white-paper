(function() {
  'use strict';

  angular.module('app', ['ui.router','feature1'])

  .controller('app', appCtrl);

  appCtrl.$inject = ['$scope'];

  function appCtrl($scope) {
    var vm = this;
    vm.title = "index";
  }


})();
