const express = require('express');
const router = express.Router();
const { projectDataSearchID, findDevelopersWithProject, findTagsForProject } = require('../db/queries/projects.js');
const{ findProjectAdmin } =require('../db/queries/developers.js');

// import query helper functions and use them in routes

// projects list page
router.get('/api/projects', (req, res) => {

});

// create project page
router.get('/create', (req, res) => {

});

// project application page
router.get('/:id/apply', (req, res) => {
  const project_id = req.params.id;

  projectDataSearchID(project_id)
    .then((projectData) => {

      // Check if projectData exists
      if (projectData.length > 0) {
        res.status(200).json(projectData);
      } else {
        res.status(404).json({ error: 'Project not found' });
      }
    })
    .catch((err) => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// individual project details page
router.get('/:id/details', async (req, res) => {
  const project_id = req.params.id;

  let responseArray = [];

  // call first query helper func
  projectDataSearchID(project_id)
    .then(projectData  => {
      console.log('projectData:', projectData);
      responseArray.push(projectData);
      // call second query helper func
      return findDevelopersWithProject(project_id);
    })
    .then(developerData => {
      console.log('developerData:', developerData);
      responseArray.push(developerData);
      // call third query helper func
      return findTagsForProject(project_id);
    })
    .then(projectTagData => {
      console.log('projectTagData:', projectTagData);
      responseArray.push(projectTagData);
      return findProjectAdmin(project_id);
    })
    .then(projectAdminData => {
      console.log('projectAdminData:', projectAdminData);
      responseArray.push(projectAdminData);
    })
    .then(() => res.status(200).json(responseArray))
    .catch((err) => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// edit individual project details page
router.get('/:id/edit', (req, res) => {

});



module.exports = router;