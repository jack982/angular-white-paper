


  angular = require('angular');


  angular.module('feature1')
    .controller('feature1', feature1);


  feature1.$inject = ['$scope', 'featuresService'];

  function feature1($scope, featuresService) {
    var vm = this;
    vm.title = 'feature1';

    vm.features = featuresService.list();

    vm.item = null;

    vm.addItem = function( ) {
        featuresService.add( vm.item );
        vm.item = null;
    }
  }



require('./features.service.js');
