const { db } = require('../connection');

// define helper functions to query the db, then export with module.exports
const allOrgData = function() {
  return db
    .query(`
    SELECT
    *
    FROM organizations
    `)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const orgDataSearchID = function(id) {
  return db
    .query(`
    SELECT
    *
    FROM organizations
    WHERE organizations.id = $1`, 
    [id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const orgDataSearchName = function(name) {
  return db
    .query(`
    SELECT
    *
    FROM organizations
    WHERE lower(organizations.name) LIKE lower($1)
    `, [`%${name}%`])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const orgDoubleCheck = function(name) {
  return db
    .query(`
    SELECT
    *
    FROM organizations
    WHERE lower(organizations.name) LIKE lower($1)
    `, [name])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR2:", err.message);
    });
};

const checkOrgAdmin = function(orgID) {
  return db
    .query(`
    SELECT
    user_id, users.username, users.image
    FROM organizations
    JOIN users
    ON users.id = organizations.user_id
    WHERE organizations.id = $1 
    `, [orgID])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const browseOrgs = function(name) {
  return db
    .query(`
    SELECT
    *
    FROM organizations
    WHERE lower(organizations.name) ILIKE $1
    GROUP BY (organizations.id)
    `, [`%${name}%`])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

const orgAdminApplications = function(userId) {
  return db
    .query(`
    SELECT
    applications.user_id as applicant, applications.text as text, users.username as username, projects.name as projectname, users.image as userimage
    FROM organizations
    JOIN projects
    ON organizations.id = projects.organization_id
    JOIN applications
    ON projects.id = applications.project_id
    JOIN users
    ON applications.user_id = users.id
    WHERE organizations.user_id = $1
    `, 
    [userId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log("ERROR:", err.message);
    });
};

module.exports = { allOrgData, orgDataSearchID, orgDataSearchName, checkOrgAdmin, orgDoubleCheck, browseOrgs, orgAdminApplications };