var authService = function ($q, $http, loggingService, AUTH_ROLES) {

  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = undefined;
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }


  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    loggingService.debug('using credentials: ' + token);

    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;

    if (username == 'admin') {
      role = AUTH_ROLES.admin
    }
    if (username == 'user') {
      role = AUTH_ROLES.public
    }

    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function (name, pw) {
    return $q(function (resolve, reject) {
      if ((name == 'admin' && pw == 'admin') || (name == 'user' && pw == 'user')) {
        // Make a request and receive your auth token from your server
        storeUserCredentials(name + '.yourServerToken');
        resolve('Login success.');
      } else {
        reject('Login Failed.');
      }
    });
  };

  var logout = function () {
    destroyUserCredentials();
  };

  var isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function () {
      return isAuthenticated;
    },
    username: function () {
      return username;
    },
    role: function () {
      return role;
    }
  };
};

authService.$inject = ['$q', '$http', 'loggingService', 'AUTH_ROLES'];

module.exports = authService;
