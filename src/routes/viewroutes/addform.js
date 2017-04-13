const query = require('../../queries/query.js');

const handler = (request, reply) => query.getAll((err, res) => {
  if (err) {
    console.log(err);
    return reply.code(500);
  }

  const data = {
    title: 'FACN Hapi Members',
    description: 'An app which shows people involved in FACN1, where a user can see everyone involved, and add new people',
    members: res.rows,
    user: false,
    imgUrl: false,
    isLoggedIn: false
  };

  if (request.auth.isAuthenticated) {
    data.user = request.auth.credentials.user.username;
    data.imgUrl = request.auth.credentials.user.image_url;
    data.isLoggedIn = true;

    return reply.view('addform', data);
  }
  return reply.view('notloggedin', data);
});


const options = {
  method: 'GET',
  path: '/addform',
  handler
};

module.exports = options;
