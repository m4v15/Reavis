const homeEndpoint = require('./home.js');
const staticEndpoint = require('./static.js');
const searchEndpoint = require('./search.js');
const addMemberEndpoint = require('./addMember.js');
const loginEndpoint = require('./login.js');

module.exports = [
  homeEndpoint,
  staticEndpoint,
  addMemberEndpoint,
  searchEndpoint,
  loginEndpoint
];
