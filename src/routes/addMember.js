const query = require('../queries/query.js');

const handler = (request, reply) => {

  query.addMember(request.payload, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Database INSERT INTO response: ', res);
  })

  reply.redirect('/');
}

const options = {
  method: 'POST',
  path: '/add-member',
  handler: handler
};

module.exports = options;
