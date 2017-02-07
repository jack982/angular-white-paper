var package = require('../package.json');

var shared = {
    APP_VERSION: package.version,
    ENABLE_DEBUG : process.env.ENABLE_DEBUG || false,
    JWT_APP_SECRET: process.env.JWT_APP_SECRET
}


var environments = {
    development : {
        ENV_VARS : shared
    },
    production : {
        ENV_VARS :  shared
    }
}

environments.development.ENV_VARS.ENABLE_DEBUG = true;


module.exports = environments;
