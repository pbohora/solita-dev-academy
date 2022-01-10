const devConfig = require('./devConfig');
const prodConfig = require('./prodConfig');
const testConfig = require('./testConfig');

let config;

switch (process.env.NODE_ENV) {
case 'development':
  config = devConfig;
  break;

case 'production':
  config = prodConfig;
  break;

case 'test':
  config = testConfig;
  break;

default:
  config = devConfig;
}

module.exports = config;
