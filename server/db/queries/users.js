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
    users.*, organizations.id AS organization_id
    FROM users
    JOIN organizations ON organizations.user_id = users.id
    JOIN developers_information ON developers_information.user_id = users.id
    WHERE lower(users.username) = lower($1)
    `, [name])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const browseUsers = function(name) {
  return db
    .query(`
    SELECT
    users.*, organizations.id AS organization_id
    FROM users
    JOIN organizations ON organizations.user_id = users.id
    JOIN developers_information ON developers_information.user_id = users.id
    WHERE lower(users.username) ILIKE '%$1%'
    `, [name])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const browseUsersTag = function(searchTerm) {
  return db
    .query(`
    SELECT
    users.*
    FROM users
    JOIN assigned_tags_users ON users.id = assigned_tags_users.user_id
    JOIN tags ON assigned_tags_users.tag_id = tags.id
    WHERE lower(users.username) ILIKE '%$1%'
    OR
    lower(tags.tag_name) ILIKE '%$2%'
    `, [searchTerm, searchTerm])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

module.exports = { allUserData, userDataSearchID, userDataSearchName, browseUsers, browseUsersTag };
// WHERE lower(users.username) ILIKE '%$1%' OR
