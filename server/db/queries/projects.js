const { db } = require('../connection');

// define helper functions to query the db, then export with module.exports
const allProjectData = function() {
  return db
    .query(`
    SELECT
    *
    FROM projects
    `)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const projectDataSearchID = function(id) {
  return db
    .query(`
    SELECT
    *
    FROM projects
    WHERE projects.id = $1`, 
    [id])
    .then((result) => {
      console.log('Database query result:', result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const projectDataSearchName = function(name) {
  return db
    .query(`
    SELECT
    *
    FROM projects
    WHERE lower(projects.name) LIKE lower('%$1%')
    `, [name])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};


module.exports = { allProjectData, projectDataSearchID, projectDataSearchName };