const { db } = require('../connection');

// define helper functions to query the db, then export with module.exports
const createOrgWithValues = (name, description, website, user_id, image) => {
  return db
  .query(`
  INSERT INTO organizations (name, description, website, user_id, image) VALUES
  ($1, $2, $3, $4, $5)
  `, [name, description, website, user_id, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const createOrgWithObject = (orgObj) => {
  const {name, description, website, user_id, image} = orgObj;
  return db
  .query(`
  INSERT INTO organizations (name, description, website, user_id, image) VALUES
  ($1, $2, $3, $4, $5)
  `, [name, description, website, user_id, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

module.exports = { createOrgWithValues, createOrgWithObject };