const { db } = require('../connection');

// define helper functions to query the db, then export with module.exports
const createUserWithValues = (username, email, admin, password, description, city, province, country, image) => {
  return db
  .query(`
  INSERT INTO users (username, email, admin, password, description, city, province, country, image) VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `, [username, email, admin, password, description, city, province, country, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const createUserWithObject = (userObj) => {
  const {username, email, admin, password, description, city, province, country, image} = userObj;
  return db
  .query(`
  INSERT INTO users (username, email, admin, password, description, city, province, country, image) VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `, [username, email, admin, password, description, city, province, country, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const modifyUserWithValues = (userID, username, email, admin, password, description, city, province, country, image) => {
  return db
  .query(`
  UPDATE organizations
    SET 
    name = $2,
    description = $3,
    status = $4,
    organization_id = $5,
    image = $6
    WHERE organizations.id = $1;
  `, [userID, username, email, admin, password, description, city, province, country, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const modifyUserWithObject = (userID, userObj) => {
  const {username, email, admin, password, description, city, province, country, image} = userObj;
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
  `, [userID, username, email, admin, password, description, city, province, country, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

module.exports = { createUserWithValues, createUserWithObject, modifyUserWithValues, modifyUserWithObject };