const { db } = require('../connection');

// define helper functions to query the db, then export with module.exports
const createProjectWithValues = (name, description, status, organization_id, image) => {
  return db
  .query(`
  INSERT INTO projects (name, description, status, organization_id, image) VALUES
  ($1, $2, $3, $4, $5)
  `, [name, description, status, organization_id, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const createProjectWithObject = (projectObj) => {
  const {name, description, status, organization_id, image} = projectObj;
  return db
  .query(`
  INSERT INTO projects (name, description, status, organization_id, image) VALUES
  ($1, $2, $3, $4, $5)
  `, [name, description, status, organization_id, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

module.exports = { createProjectWithValues, createProjectWithObject };