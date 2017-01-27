
angular = require('angular');

    angular.module('feature1')

    .service('featuresService', service);


    service.$inject = [];

    function service() {
        var features = ['ui-router', 'bootstrap', 'karma'];

        return {
            'list': function () {
                return features;
            },
            'get': function (index) {
                var feature = null;
                if (index <= features.length - 1 && index >= 0) {
                    feature = features[index];
                }
                return feature;
            },
            'add': function( item ) {
                features.push( item );
            }
        };
    }
