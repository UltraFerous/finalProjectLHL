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

const modifyOrgWithValues = (orgID, name, description, website, user_id, image) => {
  return db
  .query(`
  UPDATE organizations
    SET 
    name = $2,
    description = $3,
    website = $4,
    user_id = $5,
    image = $6
    WHERE organizations.id = $1;
  `, [orgID, name, description, website, user_id, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const modifyOrgWithObject = (orgID, orgObj) => {
  const {name, description, website, user_id, image} = orgObj;
  return db
  .query(`
  UPDATE organizations
    SET 
    name = $2,
    description = $3,
    website = $4,
    user_id = $5,
    image = $6
    WHERE organizations.id = $1;
  `, [orgID, name, description, website, user_id, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

module.exports = { createOrgWithValues, createOrgWithObject, modifyOrgWithValues, modifyOrgWithObject };