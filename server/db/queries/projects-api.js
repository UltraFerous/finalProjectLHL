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
  const { name, description, status, organization_id, image } = projectObj;
  return db
    .query(`
  INSERT INTO projects (name, description, status, organization_id, image) VALUES
  ($1, $2, $3, $4, $5)
  RETURNING id;
  `, [name, description, status, organization_id, image])
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log('Error:', err);
    });
};

const modifyProjectWithValues = (projectID, name, description, status, image) => {
  return db
    .query(`
  UPDATE projects
    SET 
    name = $2,
    description = $3,
    status = $4,
    image = $5
    WHERE projects.id = $1;
  `, [projectID, name, description, status, image])
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log('Error:', err);
    });
};

const modifyProjectWithObject = (projectID, projectObj) => {
  const { name, description, status, image } = projectObj;
  return db
    .query(`
  UPDATE projects
    SET 
    name = $2,
    description = $3,
    status = $4,
    image = $5
    WHERE projects.id = $1;
  `, [Number(projectID), name, description, status, image])
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

const removeTagFromProject = (projectID, tagID) => {
  return db
    .query(`
  DELETE FROM assigned_tags_projects WHERE 
  project_id = $1 AND tag_id = $2
  `, [projectID, tagID])
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log('Error:', err);
    });
};

const applyForProject = (applicationObj) => {
  const { user_id, project_id, text } = applicationObj;
  return db
    .query(`
  INSERT INTO applications (user_id, project_id, text) VALUES
  ($1, $2, $3)
  `, [user_id, project_id, text])
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log('Error:', err);
    });
};

const acceptUserForProject = (applicationObj) => {
  const { user_id, project_id } = applicationObj;
  return db
    .query(`
  UPDATE applications
  SET 
  status = 1
  WHERE user_id = $1 AND project_id = $2
  `, [user_id, project_id])
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log('Error:', err);
    });
};

const removeUserFromProject = (applicationObj) => {
  const { user_id, project_id } = applicationObj;
  return db
    .query(`
  UPDATE applications
  SET 
  status = 0
  WHERE user_id = $1 AND project_id = $2
  `, [user_id, project_id])
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.log('Error:', err);
    });
};

const addProjectPost = (text, projectId) => {
  return db
    .query(`
  INSERT INTO posts (text, projectId) VALUES
  ($1, $2)
  `, [text, projectId])
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log('Error:', err);
    });
};

module.exports = {
  createProjectWithValues,
  createProjectWithObject,
  modifyProjectWithValues,
  modifyProjectWithObject,
  addTagToProject,
  removeTagFromProject,
  applyForProject,
  acceptUserForProject,
  removeUserFromProject,
  addProjectPost,
};