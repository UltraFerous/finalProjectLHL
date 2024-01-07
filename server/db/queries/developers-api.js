const { db } = require('../connection');

// define helper functions to query the db, then export with module.exports
const createDeveloperInformation = (userID, linkedin, github, website) => {
  return db
  .query(`
  INSERT INTO developers_information (user_id, linkedin, github, website) VALUES
  ($1, $2, $3, $4) 
  `, [userID, linkedin, github, website])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

module.exports = { createDeveloperInformation };