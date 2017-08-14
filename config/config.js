var package = require('../package.json');

var shared = {
    APP_VERSION: package.version,
    DEBUG_ENABLED : process.env.APP_DEBUG_ENABLED || false,
    APP_SECRET: process.env.APP_SECRET,
    API_DEMO_URL : process.env.APP_API_DEMO_URL,
    APP_LOCAL_TOKEN_KEY: process.env.APP_LOCAL_TOKEN_KEY || 'yourTokenKey'
}


var environments = {
    development : {
        APP_CONSTANTS : Object.assign({}, shared)
    },
    production : {
        APP_CONSTANTS : Object.assign({}, shared)
    }
}

environments.production.APP_CONSTANTS.BUILD_PACK_URL = 'https://www.google.com/angular';


module.exports = environments;
