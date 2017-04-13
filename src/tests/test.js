const server = require('../server.js');
const tape = require('tape');
const jwt = require('jsonwebtoken');
require('env2')('./config.env');

server.start();

tape('check the home route', (t) => {
  server.inject({ url: '/', method: 'GET' }, (res) => {
    const testString = '<meta http-equiv="X-UA-Compatible" content="IE=edge" />';
    t.equal(res.statusCode, 200, 'status code is 200');
    t.ok(res.payload.includes(testString), 'test string is served up');
    t.end();
  });
});

tape('check the styles route', (t) => {
  server.inject({ url: '/style.css', method: 'GET' }, (res) => {
    const testString = 'html, body, div, span, applet, object, iframe,';
    t.equal(res.statusCode, 200, 'status code is 200');
    t.ok(res.payload.includes(testString), 'test string is served up');
    t.end();
  });
});

tape('check the addform route with no authentication', (t) => {
  server.inject({ url: '/addform', method: 'GET' }, (res) => {
    const testString = '<p>Log In Using The Button Above To Access That Page</p>';
    t.equal(res.statusCode, 200, 'status code is 200');
    t.ok(res.payload.includes(testString), 'test string is served up');
    t.end();
  });
});

tape('check the addform route with authentication', (t) => {
  const jwtOptions = {
    expiresIn: Date.now() + (24 * 60 * 60 * 1000),
    subject: 'githubData'
  };
  const testJwtPayload = {
    user: {
      username: 'test-user',
      image_url: 'fake_url',
      org_url: 'fake-orgs'
    },
    status: 'loggedIn'
  };
  const secret = process.env.SECRET;
  jwt.sign(testJwtPayload, secret, jwtOptions, (jwtError, token) => {
    const headers = { Authorization: token };
    server.inject({ url: '/addform', method: 'GET', headers }, (res) => {
      const testString = '  <form class="add-member" action="/add-member" method="post">';
      t.equal(res.statusCode, 200, 'status code is 200');
      t.ok(res.payload.includes(testString), 'test string is served up');
      t.end();
    });
  });
});

tape.onFinish(() => process.exit(0));
