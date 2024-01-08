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

const addTagToDeveloper = (userID, tagID) => {
  return db
  .query(`
  INSERT INTO assigned_tags_users (user_id, tag_id) VALUES 
  ($1, $2) 
  `, [userID, tagID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

module.exports = { createDeveloperInformation, addTagToDeveloper };