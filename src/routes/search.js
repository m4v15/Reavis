const query = require('../queries/query.js');

const handler = (request, reply) =>{
  let searchQuery = encodeURIComponent(request.query.search);
  query.searchFor(searchQuery, (err,res) => {
    if(err) console.log(err);
    let data = {
        title: 'FACN Hapi Members',
        description: 'An app which shows people involved in FACN1, where a user can see everyone involved, and add new people',
        members: res.rows
      }
    reply.view('index', data);
  });
};

const options = {
  method: 'GET',
  path: '/search/',
  handler: handler
};



module.exports = options;
