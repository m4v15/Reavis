const fs = require('fs');
const path = require('path');
const request = require('request');
const query = require('../src/queries/query.js');

const dbConnection = require('./db_connection.js');

const headers = {
  'User-Agent': 'Reavis',
  Authorization: `token ${process.env.MYPERSONALTOKEN}`
};

const options = {
  method: 'GET',
  url: 'https://api.github.com/orgs/FACN1/members',
  headers
};


fs.readFile(path.join(__dirname, './db_build.sql'), (err, file) => {
  if (err) throw err;
  dbConnection.query(file.toString(), (error, res) => {
    if (error) throw error;
    request(options, (Rerror, response, body) => {
      const memberArray = JSON.parse(body);
      let members = 0;
      const params = [];
      memberArray.forEach((user) => {
        params.push(user.id);
        params.push(user.login);
        params.push(user.html_url);
        params.push('Nazareth');
        params.push(user.avatar_url);
        params.push('English');
        members += 1;
      });
      query.filldb(members, params, () => {
        console.log(`Database made with res: ${res}`);
        process.exit(0);
      });
    });
  });
});
