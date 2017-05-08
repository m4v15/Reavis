const homeEndpoint = require('./viewroutes/home.js');
const staticEndpoint = require('./static.js');
const loginEndpoint = require('./authroutes/login.js');
const welcomeEndpoint = require('./authroutes/welcome.js');
const logoutEndpoint = require('./authroutes/logout.js');

module.exports = [
  homeEndpoint,
  staticEndpoint,
  loginEndpoint,
  welcomeEndpoint,
  logoutEndpoint
];
