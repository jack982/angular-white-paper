var package = require('../package.json');

var shared = {
  APP_VERSION: package.version,
  ENABLE_DEBUG : false
}


var environments = {
    development : shared,
    production : shared
}

environments.development.ENABLE_DEBUG = true;


module.exports = environments;
