const query = require('../queries/query.js');
const Request = require('request');

const handler = (request, reply) => {
  const tempCode = request.query.code;

  if (!tempCode) {
    return query.getAll((err, res) => {
      if (err) {
        console.log(err);
        return reply.code(500);
      }
      const dataNotLogged = {
        title: 'FACN Hapi Members',
        description: 'An app which shows people involved in FACN1, where a user can see everyone involved, and add new people',
        members: res.rows,
        githubStatus: 'Not logged in'
      };
      return reply.view('index', dataNotLogged);
    });
  }
  const data = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: request.query.code
  };
  const options = {
    method: 'POST',
    body: data,
    json: true,
    url: 'https://github.com/login/oauth/access_token'
  };
  return Request(options, (error, response, body) => {
    if (error) {
      console.log('post request error:', error);
      return reply.code(500);
    }
    if (!body.access_token) {
      return reply.view('index', { title: 'Something went wrong' });
    }
    return query.getAll((err, res) => {
      if (err) {
        console.log('query error', err);
        return reply.code(500);
      }
      const dataLogged = {
        title: 'FACN Hapi Members',
        description: 'An app which shows people involved in FACN1, where a user can see everyone involved, and add new people',
        members: res.rows,
        githubStatus: 'Logged in'
      };
      return reply.view('index', dataLogged);
    });
  });
};

const options = {
  method: 'GET',
  path: '/',
  handler
};

module.exports = options;
