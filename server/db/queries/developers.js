const { db } = require('../connection');

// define helper functions to query the db, then export with module.exports
const findProjectAdmin = (projectID) => {
  return db
  .query(`
  SELECT
  users.id, users.username
  FROM users
  JOIN organizations ON user_id = users.id
  JOIN projects ON organization_id = organizations.id
  WHERE projects.id = $1
  `, [projectID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const findUsersByTag = (tagID) => {
  return db
  .query(`
  SELECT
  users.id, users.username
  FROM users
  JOIN assigned_tags_users
  ON assigned_tags_users.user_id = users.id
  WHERE assigned_tags_users.tag_id = $1
  `, [tagID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const findTagsForUser = (userID) => {
  return db
  .query(`
  SELECT
  tags.tag_name, assigned_tags_users.tag_id
  FROM tags
  JOIN assigned_tags_users
  ON assigned_tags_users.tag_id = tags.id
  WHERE assigned_tags_users.user_id = $1
  `, [userID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};