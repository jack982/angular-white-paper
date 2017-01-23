(function() {

  'use strict';

  angular.module('feature2', [])

    .controller('feature2', feature2);


  feature2.$inject = ['$scope'];

  function feature2($scope) {
    var vm = this;
    vm.title = 'feature2';
  }



})();
