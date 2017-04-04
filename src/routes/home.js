const handler = (request, reply) =>{
  let data = {
    title: 'FACN Hapi Members',
    description: 'An app which shows people involved in FACN1, where a user can see everyone involved, and add new people'
  }
  reply.view('index', data);
}

const options = {
  method: 'GET',
  path: '/',
  handler: handler
};

module.exports = options;
