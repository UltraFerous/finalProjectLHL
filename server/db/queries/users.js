const { db } = require('../connection');

// define helper functions to query the db, then export with module.exports
const allUserData = function() {
  return db
    .query(`
    SELECT
      *
    FROM users
    JOIN developers_information ON user_id = users.id
    `)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const userDataSearchID = function(id) {
  return db
    .query(`
    SELECT
      *
    FROM users
    JOIN developers_information ON user_id = users.id
    WHERE users.id = $1`, 
    [id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const userDataSearchName = function(name) {
  return db
    .query(`
    SELECT
      *
    FROM users
    JOIN developers_information ON user_id = users.id
    WHERE lower(users.username) = lower($1)
    `, [name])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};


module.exports = { allUserData, userDataSearchID, userDataSearchName };