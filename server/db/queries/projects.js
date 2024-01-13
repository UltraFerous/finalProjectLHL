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
    projects.*, organizations.name as orgname
    FROM projects
    JOIN organizations
    ON projects.organization_id = organizations.id 
    WHERE projects.id = $1
    `, [id])
    .then((result) => {
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
  *
  FROM posts
  WHERE posts.project_id = $1`, [projectID] )
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

const findUsersWithProject = (projectID) => {
  return db
  .query(`
  SELECT
  users.*
  FROM users
  JOIN developers_with_projects
  ON users.id = developers_with_projects.user_id
  WHERE developers_with_projects.project_id = $1
  `, [projectID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const browseProjects = function(name) {
  return db
    .query(`
      SELECT
      projects.*, organizations.name as orgname
      FROM projects
      JOIN organizations ON projects.organization_id = organizations.id
      JOIN assigned_tags_projects ON projects.id = assigned_tags_projects.project_id
      JOIN tags ON assigned_tags_projects.tag_id = tags.id
      WHERE lower(projects.name) ILIKE $1
      OR lower(tags.tag_name) ILIKE $1
      GROUP BY (projects.id, organizations.name)
    `, [`%${name}%`])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const findProjectsForOrg = (orgID) => {
  return db
  .query(`
  SELECT
  projects.*
  FROM projects
  JOIN organizations 
  ON projects.organization_id = organizations.id
  WHERE organizations.id = $1
  `, [orgID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const findPendingApplicationsForProject = (projectID) => {
  return db
  .query(`
  SELECT
  *
  FROM applications
  WHERE applications.project_id = $1
  AND applications.status = 0
  `, [orgID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const findAcceptedApplicationsForProject = (projectID) => {
  return db
  .query(`
  SELECT
  *
  FROM applications
  WHERE applications.project_id = $1
  AND applications.status = 1
  `, [orgID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

module.exports = { allProjectData, 
  projectDataSearchID, 
  projectDataSearchName, 
  findPostsForProject, 
  findApplicationsForProject, 
  findTagsForProject,
  findUsersWithProject,
  browseProjects,
  findProjectsForOrg,
  findPendingApplicationsForProject,
  findAcceptedApplicationsForProject
 };