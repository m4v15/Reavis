const Request = require('request');
require('env2')('./config.env');

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
    if (error) {
      console.log('There was an error posting the code request to Github: ', error);
      return reply.code(500);
    }
    if (!body.access_token) {
      console.log('No access token came back from github, just this body: ', body);
      return reply.code(500);
    }
    console.log('Access token: ', body.access_token);
    return reply.redirect('/');
  });
};

const options = {
  method: 'GET',
  path: '/welcome',
  handler
};

module.exports = options;
