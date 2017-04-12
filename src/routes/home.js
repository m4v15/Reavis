const query = require('../queries/query.js');

const handler = (request, reply) => query.getAll((err, res) => {
  if (err) {
    console.log(err);
    return reply.code(500);
  }
  const dataNotLogged = {
    title: 'FACN Hapi Members',
    description: 'An app which shows people involved in FACN1, where a user can see everyone involved, and add new people',
    members: res.rows
  };
  return reply.view('index', dataNotLogged);
});


const options = {
  method: 'GET',
  path: '/',
  handler
};

module.exports = options;
