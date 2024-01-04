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

module.exports = { createUserWithValues, createUserWithObject };