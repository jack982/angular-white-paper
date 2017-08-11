var service = function ($log, toaster) {


    var notify =  function (message, title, type) {
            toaster.pop(type, title, message);
            $log.debug(message);
    };

    return {
        'notify': notify,
        'success' :  function(message, title) {
            notify(message, title, 'success');
        },
        'info': function( message, title ) {
          notify(message,title, 'info');
        },

        'warn': function( message, title ) {
          notify(message,title, 'warning');
        },

        'error': function( message, title ) {
          notify(message,title, 'error');
        }
    };
};

service.$inject = ['$log', 'toaster'];

module.exports = service;
