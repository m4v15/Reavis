const db_connection = require('../../database/db_connection.js');


let table = db_connection.query('SELECT name, position, location, description, languages FROM members ', (err, res) => {
  if (err) {
    return err;
  }
  console.log(res.rows);
  return(res.rows);
})

module.exports = table;
