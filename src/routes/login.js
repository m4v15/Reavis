const querystring = require('querystring');
require('env2')('./config.env');

const handler = (request, reply) => {
  const queries = {
    client_id: process.env.CLIENT_ID,
    redirect_url: 'https://localhost:4040/welcome'
  };
  const queriesStrung = querystring.stringify(queries);
  reply.redirect(`https://github.com/login/oauth/authorize?${queriesStrung}`);
};

const options = {
  method: 'GET',
  path: '/login',
  handler
};

module.exports = options;
