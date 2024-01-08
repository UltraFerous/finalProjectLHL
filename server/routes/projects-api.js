const express = require('express');
const router = express.Router();
const { createProjectWithObject } = require('../db/queries/projects-api.js');

// import query helper functions and use them in routes

// create new project
router.post('/', (req, res) => {
  console.log("GOT THE PROJECT ", req.body);
  createProjectWithObject(req.body)
  .then((postData) => {
    res.status(200);
  })
  .catch((err) => {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  });
});

// edit individual project details
router.patch('/:id', (req, res) => {

});

// delete individual project
router.delete('/:id', (req, res) => {

});

// submit project application
router.post('/:id/apply', (req, res) => {

});

module.exports = router;