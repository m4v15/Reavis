const hapi = require('hapi');
const vision = require('vision');
const routes = require('./routes/index.js');
const inert = require('inert');
const hbs = require('handlebars');
const haj = require('hapi-auth-jwt2');
const query = require('./queries/query.js');

require('env2')('./config.env');


const validate = (token, request, callback) => {
  query.searchFor(token.user.username, (err, res) => {
    if (res.rows.length){
      return callback(null, true);
    } else {
      return callback(null, false);
    }
  })  
};


const server = new hapi.Server({
  connections: {
    state: {
      isSameSite: 'Lax'
    }
  }
});

server.connection({
  port: process.env.PORT || 4000
});

server.register([inert, vision, haj], (error) => {
  if (error) throw error;

  server.views({
    engines: {
      hbs
    },
    relativeTo: __dirname,
    path: 'views',
    helpersPath: 'views/helpers',
    partialsPath: 'views/partials',
    layoutPath: 'views/layout',
    layout: 'default'
  });
  server.auth.strategy('jwt-strategy', 'jwt', 'optional', {
    key: process.env.SECRET,
    validateFunc: validate,
    verifyOptions: { algorithms: ['HS256'] }
  });
  server.route(routes);
});

module.exports = server;
