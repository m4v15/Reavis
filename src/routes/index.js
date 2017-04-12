const homeEndpoint = require('./home.js');
const staticEndpoint = require('./static.js');
const searchEndpoint = require('./search.js');
const addMemberEndpoint = require('./addMember.js');
const loginEndpoint = require('./login.js');
const welcomeEndpoint = require('./welcome.js');

module.exports = [
  homeEndpoint,
  staticEndpoint,
  addMemberEndpoint,
  searchEndpoint,
  loginEndpoint,
  welcomeEndpoint
];
