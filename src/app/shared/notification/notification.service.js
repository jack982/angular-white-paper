var service = function () {

    return {
        'notify': function (message) {
            console.log(message);
        }
    };
};

module.exports = service;