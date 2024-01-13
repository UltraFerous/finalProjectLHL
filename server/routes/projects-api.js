const express = require('express');
const router = express.Router();
const { createProjectWithObject, modifyProjectWithObject, applyForProject, addTagToProject, addProjectPost } = require('../db/queries/projects-api.js');

// import query helper functions and use them in routes

// create new project
router.post('/', (req, res) => {

  const { tags, ...projectData} = req.body

  createProjectWithObject(projectData)
  .then((project) => {
    const projectId = project.id;

    // Insert tags for the project
    const tagInsertPromises = tags.map((tagId) =>
      addTagToProject(projectId, tagId)
    );

    return Promise.all(tagInsertPromises);
  })
  .then(() => res.status(200).json({ success: true }))
  .catch((err) => {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  });
});

// edit individual project details
router.patch('/:id', (req, res) => {
  modifyProjectWithObject(req.body.id, req.body)
  .then((projectData) => {
    console.log("All DONE!")
    res.status(200);
  })
  .catch((err) => {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  });
});

// submit project application
router.post('/:id/apply', (req, res) => {
  applyForProject(req.body)
  .then((response) => {
    res.status(200).json(response);
  })
  .catch((err) => {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  })
});

// add project post
router.post('/:id/addpost', (req, res) => {
  addProjectPost(req.body)
  .then((response) => {
    res.status(200);
  })
  .catch((err) => {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  })
})

module.exports = router;