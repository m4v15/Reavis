const db_connection = require('../../database/db_connection.js');


const getAll = (cb) => {
  db_connection.query('SELECT name, position, location, description, languages FROM members ', cb)
}

const searchFor = (search, cb) => {
  let searchTerm = "%" + search + "%"
  db_connection.query(
    "SELECT name, position, location, description, languages FROM members WHERE name ILIKE $1 OR position ILIKE $1 OR location ILIKE $1 OR description ILIKE $1 OR languages ILIKE $1;", [searchTerm],cb)
}


const addMember = (member, cb) => {
  db_connection.query('INSERT INTO members (name, position, location, description, languages) VALUES ($1, $2, $3, $4, $5)', [member.name, member.position, member.location, member.description, member.languages], cb);
}

module.exports = { getAll, searchFor, addMember }
