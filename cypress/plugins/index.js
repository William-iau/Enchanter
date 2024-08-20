const mochawesome = require('cypress-mochawesome-reporter/plugin');

module.exports = (on, config) => {
  mochawesome(on);
  // Other plugin configurations if needed
  return config;
};
