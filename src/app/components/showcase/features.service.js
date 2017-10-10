var features = function () {
    'use strict';

    var features = [
        {
          name: 'Bootstrap',
          version: '1.0',
          url:  'assets/images/logo/bootstrap.png'
        },
        {
          name: 'Browserify',
          version: '1.0',
          url: 'assets/images/logo/browserify.png'
        },
        {
          name: 'Browser-Sync',
          version: '1.0',
          url:  'assets/images/logo/BrowserSync.jpg'
        },
        {
          name: 'FontAwesome',
          version: '1.0',
          url:  'assets/images/logo/font-awesome.png'
        },
        {
          name: 'Gulp',
          version: '1.0',
          url:  'assets/images/logo/gulp.png'
        },
        {
          name: 'Karma',
          version: '1.0',
          url: 'assets/images/logo/karma.png'
        },
        {
          name: 'Jasmine',
          version: '1.0',
          url:  'assets/images/logo/jasmine.png'
        },
        {
          name: 'PhantomJS',
          version: '1.0',
          url:  'assets/images/logo/phantomjs.png'
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
