const handler = (request, reply) => {
  reply.redirect('/')
       .state('token', null, {
         isHttpOnly: false,
         path: '/',
         isSecure: false
       });
};

const options = {
  method: 'GET',
  path: '/logout',
  handler
};

module.exports = options;
