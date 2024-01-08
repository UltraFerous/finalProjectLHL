const { db } = require('../connection');

// define helper functions to query the db, then export with module.exports
const createProjectWithValues = (name, description, status, organization_id, image) => {
  return db
  .query(`
  INSERT INTO projects (name, description, status, organization_id, image) VALUES
  ($1, $2, $3, $4, $5)
  `, [name, description, status, organization_id, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const createProjectWithObject = (projectObj) => {
  const {name, description, status, organization_id, image} = projectObj;
  return db
  .query(`
  INSERT INTO projects (name, description, status, organization_id, image) VALUES
  ($1, $2, $3, $4, $5)
  `, [name, description, status, organization_id, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const modifyProjectWithValues = (projectID, name, description, status, organization_id, image) => {
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
  `, [projectID, name, description, status, organization_id, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const modifyProjectWithObject = (projectID, projectObj) => {
  const {name, description, status, organization_id, image} = projectObj;
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
  `, [projectID, orgObj, name, description, status, organization_id, image])
  .then(result => {
    return result.rows[0];
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

const addTagToProject = (projectID, tagID) => {
  return db
  .query(`
  INSERT INTO assigned_tags_projects (project_id, tag_id) VALUES  
  ($1, $2) 
  `, [projectID, tagID])
  .then(result => {
    return result.rows;
  })
  .catch(err => {
    console.log('Error:', err);
  });
};

module.exports = { createProjectWithValues, createProjectWithObject, modifyProjectWithValues, modifyProjectWithObject, addTagToProject };