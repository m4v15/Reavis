const query = require('../queries/query.js');

const handler = (request, reply) => {

  query.addMember(request.payload, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
  })

  reply.redirect('/');
}

const options = {
  method: 'POST',
  path: '/add-member',
  handler: handler
};

module.exports = options;
