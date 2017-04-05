const query = require('../queries/query.js');

const handler = (request, reply) => {

  query.addMember(request.payload, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Database INSERT INTO response: ', res);
  })

  // query.getAll((err,res) => {
  //   if(err) console.log(err);
  //   let data = {
  //       title: 'FACN Hapi Members',
  //       description: 'An app which shows people involved in FACN1, where a user can see everyone involved, and add new people',
  //       members: res
  //     }
  //   reply.view('index', data);
  // })
  // query.addMember()
  reply.redirect('/');
}

const options = {
  method: 'POST',
  path: '/add-member',
  handler: handler
};

module.exports = options;
