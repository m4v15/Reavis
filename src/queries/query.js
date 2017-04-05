const db_connection = require('../../database/db_connection.js');


let getAll = (cb) => {
  db_connection.query('SELECT name, position, location, description, languages FROM members ', (err, res) => {
  if (err) {
    cb(err);
  }
  else{
    cb(null, res.rows);
  }
})
}

module.exports = {
  getAll
}
