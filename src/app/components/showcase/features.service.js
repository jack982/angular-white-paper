var features = function () {
    var features = [
        {
          name: 'ui-router',
          version: '1.0',
          url: null
        },
        {
          name: 'bootstrap',
          version: '1.0',
          url: null
        },
      {
          name: 'karma',
          version: '1.0',
          url: null
        }
    ];

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
        'add': function (item) {
            features.push(item);
        }
    };
};

module.exports = features;
