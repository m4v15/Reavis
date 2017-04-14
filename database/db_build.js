const fs = require('fs');
const path = require('path');
const request = require('request');

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

request(options, (error, response, body) => {
  console.log(JSON.parse(body));
});

fs.readFile(path.join(__dirname, './db_build.sql'), (err, file) => {
  if (err) throw err;
  dbConnection.query(file.toString(), (error, res) => {
    if (error) throw error;
    console.log('Database created with the result: ', res);
    process.exit();
  });
});
