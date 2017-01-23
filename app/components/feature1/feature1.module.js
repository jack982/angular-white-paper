(function() {

  'use strict';

  angular.module('feature1', [])

    .controller('feature1', feature1);


  feature1.$inject = ['$scope', 'featuresService'];

  function feature1($scope, featuresService) {
    var vm = this;
    vm.title = 'feature1';
      
    vm.features = featuresService.list();
  }



})();
