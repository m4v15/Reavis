const homeEndpoint = require('./viewroutes/home.js');
const staticEndpoint = require('./static.js');
const searchEndpoint = require('./viewroutes/search.js');
const addMemberEndpoint = require('./addMember.js');
const loginEndpoint = require('./authroutes/login.js');
const welcomeEndpoint = require('./authroutes/welcome.js');
const addFormEndpoint = require('./viewroutes/addform.js');
const logoutEndpoint = require('./authroutes/logout.js');

module.exports = [
  homeEndpoint,
  staticEndpoint,
  addMemberEndpoint,
  searchEndpoint,
  loginEndpoint,
  welcomeEndpoint,
  addFormEndpoint,
  logoutEndpoint
];
