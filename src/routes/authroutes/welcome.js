require('env2')('./config.env');
const helpers = require('../../helpers/index.js');
const Request = require('request');


const handler = (request, reply) => {
  const tempCode = request.query.code;

  const data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: tempCode
  };
  const options = {
    method: 'POST',
    body: data,
    json: true,
    url: 'https://github.com/login/oauth/access_token'
  };
  Request(options, (error, response, body) => {
    helpers.saveAccess(error, response, body, reply);
  });
};

const options = {
  method: 'GET',
  path: '/welcome',
  handler
};

module.exports = options;
