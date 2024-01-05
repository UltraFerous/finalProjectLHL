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
    projects.*, organizations.name
    FROM projects
    JOIN organizations
    ON projects.organization_id = organizations.id 
    WHERE projects.id = $1
    `, [id])
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

const findPostsForProject = (projectID) => {
  return db
  .query(`
  SELECT
  linked_users_posts.user_id, posts.text
  FROM posts
  JOIN linked_users_posts
  ON posts.id = linked_users_posts.post_id
  WHERE posts.project_id = $1
  `, [projectID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const findApplicationsForProject = (projectID) => {
  return db
  .query(`
  SELECT
  *
  FROM applications
  WHERE applications.project_id = $1
  `, [projectID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const findTagsForProject = (projectID) => {
  return db
  .query(`
  SELECT
  assigned_tags_projects.tag_id, tags.tag_name
  FROM tags
  JOIN assigned_tags_projects
  ON assigned_tags_projects.tag_id = tags.id
  WHERE assigned_tags_projects.project_id = $1
  `, [projectID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const findDevelopersWithProject = (projectID) => {
  return db
  .query(`
  SELECT
  developers_with_projects.user_id,
  users.username
  FROM developers_with_projects
  JOIN users
  ON developers_with_projects.user_id = users.id
  WHERE developers_with_projects.project_id = $1
  `, [projectID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

module.exports = { allProjectData, projectDataSearchID, projectDataSearchName, findPostsForProject, findApplicationsForProject, findTagsForProject, findDevelopersWithProject };