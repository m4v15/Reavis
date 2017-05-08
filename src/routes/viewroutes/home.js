const query = require('../../queries/query.js');

const handler = (request, reply) => query.getAll((err, res) => {
  if (err) {
    console.log(err);
    return reply.code(500);
  }

  let user = false;
  let imgUrl = false;
  let isLoggedIn = false;
  let members = [];

  if (request.auth.isAuthenticated) {
    user = request.auth.credentials.user.username;
    imgUrl = request.auth.credentials.user.image_url;
    isLoggedIn = true;
    members = res.rows
  }

  const data = {
    title: 'FAC Hapi Members',
    description: 'An app which shows people involved in FAC, where a user can see everyone involved, and add new people',
    members,
    user,
    imgUrl,
    isLoggedIn
  };
  return reply.view('index', data);
});


const options = {
  method: 'GET',
  path: '/',
  handler
};

module.exports = options;
