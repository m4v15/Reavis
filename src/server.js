const hapi = require('hapi');
const vision = require('vision');
const path = require('path');
const routes = require('./routes/index.js');
const inert = require('inert');

const server = new hapi.Server()

server.connection({
  host: 'localhost',
  port: process.env.PORT || 4000
})

server.register([inert, vision], (error) => {
  if(error) throw error;

  server.views({
    engines: {
      hbs:require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views',
    helpersPath: 'views/helpers',
    partialsPath: 'views/partials',
    layoutPath: 'views/layout',
    layout: 'default'
  })
  server.route(routes);

  server.start(error =>{
    if(error) throw error;

    console.log('Be made Hapi at: ' + server.info.uri);
  })
})
