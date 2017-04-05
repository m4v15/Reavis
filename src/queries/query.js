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

let searchFor = (search, cb) => {

}

let addMember = (member, cb) => {
  db_connection.query('INSERT INTO members (name, position, location, description, languages) VALUES ($1, $2, $3, $4, $5)', [member.name, member.position, member.location, member.description, member.languages], (err, res) => {
    if (err) return cb(err);
    cb(null, res);
  });
}



module.exports = {
  getAll: getAll,
  searchFor: searchFor,
  addMember: addMember
}
