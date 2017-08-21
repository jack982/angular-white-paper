var features = function () {
    'use strict';

    var features = [
        {
          name: 'Bootstrap',
          version: '1.0',
          url:  'http://placehold.it/150x150'
        },
        {
          name: 'Browserify',
          version: '1.0',
          url: 'http://placehold.it/150x150'
        },
        {
          name: 'Browser-Sync',
          version: '1.0',
          url:  'http://placehold.it/150x150'
        },
        {
          name: 'FontAwesome',
          version: '1.0',
          url:  'http://placehold.it/150x150'
        },
        {
          name: 'Gulp',
          version: '1.0',
          url:  'http://placehold.it/150x150'
        },
        {
          name: 'Karma',
          version: '1.0',
          url: 'http://placehold.it/150x150'
        },
        {
          name: 'Jasmine',
          version: '1.0',
          url:  'http://placehold.it/150x150'
        },
        {
          name: 'PhantomJS',
          version: '1.0',
          url:  'http://placehold.it/150x150'
        }
    ];

    return {
        'list': function () {
            //loggingService.debug("retrieving features list...");
            return features;
        },
        'get': function (index) {
            var feature = null;
            if (index <= features.length - 1 && index >= 0) {
                feature = features[index];
            }
            return feature;
        },
        'add': function (item) {
            features.push(item);
        }
    };
};

features.$inject = [];

module.exports = features;
