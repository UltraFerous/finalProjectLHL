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

const findUsersByTagDetails = (tagID) => {
  return db
  .query(`
  SELECT
  users.*
  FROM users
  JOIN assigned_tags_users
  ON assigned_tags_users.user_id = users.id
  LEFT JOIN developers_information ON developers_information.user_id = users.id
  WHERE assigned_tags_users.tag_id = $1
  GROUP BY users.id
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
  assigned_tags_users.tag_id, tags.tag_name
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

const findPostsForUser = (userID) => {
  return db
  .query(`
  SELECT
  posts.project_id, posts.text
  FROM posts
  JOIN linked_users_posts
  ON posts.id = linked_users_posts.post_id
  WHERE linked_users_posts.user_id = $1
  `, [userID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const findUserProjects = (userID) => {
  return db
  .query(`
  SELECT
  projects.*
  FROM projects
  JOIN developers_with_projects
  ON projects.id = developers_with_projects.project_id
  WHERE developers_with_projects.user_id = $1
  `, [userID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

module.exports = { findProjectAdmin, findUsersByTag, findTagsForUser, findPostsForUser, findUserProjects, findUsersByTagDetails };