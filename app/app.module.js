(function() {
  'use strict';

  angular.module('app', [])

  .controller('app', appCtrl);

  appCtrl.$inject = ['$scope'];

  function appCtrl($scope) {
      $scope.message = "test";
  }


})();
