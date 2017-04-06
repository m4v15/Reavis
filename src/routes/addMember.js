const query = require('../queries/query.js');
const Joi = require('joi');

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
  handler: handler,
  config: {
    validate: {
      payload: {
        name: Joi.string().alphanum().required(),
        position: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required(),
        languages: Joi.string().required(),
      }
    }
  }
};

module.exports = options;
