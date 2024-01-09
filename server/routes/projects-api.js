const express = require('express');
const router = express.Router();
const { createProjectWithObject, modifyProjectWithObject } = require('../db/queries/projects-api.js');

// import query helper functions and use them in routes

// create new project
router.post('/', (req, res) => {
  createProjectWithObject(req.body)
  .then((projectData) => {
    res.status(200);
  })
  .catch((err) => {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  });
});

// edit individual project details
router.patch('/:id', (req, res) => {
  console.log("GOT IT ", req.body.id, req.body)
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

});

module.exports = router;