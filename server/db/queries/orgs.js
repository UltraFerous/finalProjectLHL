const { db } = require('../connection');

// define helper functions to query the db, then export with module.exports
const allOrgData = function() {
  return db
    .query(`
    SELECT
    *
    FROM organizations
    `)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const orgDataSearchID = function(id) {
  return db
    .query(`
    SELECT
    *
    FROM organizations
    WHERE organizations.id = $1`, 
    [id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const orgDataSearchName = function(name) {
  return db
    .query(`
    SELECT
    *
    FROM organizations
    WHERE lower(organizations.name) LIKE lower('%$1%')
    `, [name])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const checkOrgAdmin = function(orgID) {
  return db
    .query(`
    SELECT
    user_id, users.username
    FROM organizations
    JOIN users
    ON users.id = organizations.user_id
    WHERE organizations.id = $1 
    `, [orgID])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};


module.exports = { allOrgData, orgDataSearchID, orgDataSearchName, checkOrgAdmin };