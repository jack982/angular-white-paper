var features = function () {
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
        'add': function (item) {
            features.push(item);
        }
    };
};

module.exports = features;