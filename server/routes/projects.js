const express = require('express');
const router = express.Router();
const { projectDataSearchID, findDevelopersWithProject, findTagsForProject } = require('../db/queries/projects.js');

// import query helper functions and use them in routes

// projects list page
router.get('/', (req, res) => {

});

// create project page
router.get('/create', (req, res) => {

});

// individual project details page
router.get('/:id', async (req, res) => {
  const project_id = req.params.id;

  let responseArray = [];

  // call first query helper func
  projectDataSearchID(project_id)
    .then(projectData  => {
      responseArray.push(projectData);
      // call second query helper func
      return findDevelopersWithProject(project_id);
    })
    .then(developerData => {
      responseArray.push(developerData);
      // call third query helper func
      return findTagsForProject(project_id);
    })
    .then(projectTagData => {

      responseArray.push(projectTagData);
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

// project application page
router.get('/:id/apply', (req, res) => {

});

module.exports = router;