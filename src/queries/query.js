const dbConnection = require('../../database/db_connection.js');


const getAll = (cb) => {
  dbConnection.query('SELECT name, position, location, description, languages FROM members ', cb);
};

const searchFor = (search, cb) => {
  const searchTerm = `%${search}%`;
  dbConnection.query(
    'SELECT name, position, location, description, languages FROM members WHERE name ILIKE $1 OR position ILIKE $1 OR location ILIKE $1 OR description ILIKE $1 OR languages ILIKE $1;', [searchTerm], cb);
};


const addMember = (member, cb) => {
  dbConnection.query('INSERT INTO members (name, position, location, description, languages) VALUES ($1, $2, $3, $4, $5)', [member.name, member.position, member.location, member.description, member.languages], cb);
};

const filldb = (members, params, cb) => {
  let baseString = 'INSERT INTO members (id, name, position, location, description, languages) VALUES';
  let count = 1;
  for (let i = 1; i <= members; i += 1) {
    const one = count;
    const two = count + 1;
    const thr = count + 2;
    const fou = count + 3;
    const fiv = count + 4;
    const six = count + 5;
    baseString += ` ($${one}, $${two}, $${thr}, $${fou}, $${fiv}, $${six}),`;
    count += 6;
  }
  baseString = baseString.slice(0, -1);
  dbConnection.query(baseString, params, cb);
};

const addToken = (token, user) => {
  dbConnection.query('DELETE FROM tokens WHERE username ILIKE $1', [user], (err) => {
    if (err) {
      console.log('Error deleting row from database: ', err);
      return err;
    }
    return dbConnection.query('INSERT INTO tokens (token, username) VALUES ($1, $2)', [token, user]);
  });
};

module.exports = { getAll, searchFor, addMember, addToken, filldb };
