const request = require('request');
const query = require('../queries/query.js');
const jwt = require('jsonwebtoken');

const redirectAndCookie = (error, token, reply) => {
  reply.redirect('/')
  .state('token', token, {
    isHttpOnly: false,
    path: '/',
    isSecure: false
  });
};

const makeToken = (error, res, parsedBody, body, reply) => {
  query.addToken(body.access_token, parsedBody.login);
  const jwtOptions = {
    expiresIn: Date.now() + (24 * 60 * 60 * 1000),
    subject: 'githubData'
  };
  const payload = {
    user: {
      username: parsedBody.login,
      image_url: parsedBody.avatar_url,
      org_url: parsedBody.organizations_url
    },
    status: 'loggedIn'
  };
  const secret = process.env.SECRET;
  jwt.sign(payload, secret, jwtOptions, (jwtError, token) => {
    redirectAndCookie(jwtError, token, reply);
  });
};

const checkMembership = (error, res, getBody, body, reply) => {
  const parsedBody = JSON.parse(getBody);
  const headers = {
    'User-Agent': 'Reavis',
    Authorization: `token ${body.access_token}`
  };

  const options = {
    method: 'GET',
    url: parsedBody.organizations_url,
    headers
  };
  request(options, (orgError, response, orgBody) => {
    return makeToken(error, res, parsedBody, body, reply);
  });
};

const saveAccess = (error, response, body, reply) => {
  if (error) {
    console.log('There was an error posting the code request to Github: ', error);
    return reply.code(500);
  }
  if (!body.access_token) {
    console.log('No access token came back from github, just this body: ', body);
    return reply.code(500);
  }
  const headers = {
    'User-Agent': 'Reavis',
    Authorization: `token ${body.access_token}`
  };
  const options = {
    method: 'GET',
    url: 'https://api.github.com/user',
    headers
  };
  return request(options, (getError, getResponse, getBody) => {
    checkMembership(getError, getResponse, getBody, body, reply);
  });
};

module.exports = { saveAccess };
