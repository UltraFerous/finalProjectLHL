const express = require('express');
const router = express.Router();

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

  try {
    const projectData = projectDataSearchID(project_id);
    console.log(projectData);

  // Check if projectData exists
  if (projectData.length > 0) {
    res.status(200).json(projectData);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
} catch (err) {
  console.error("ERROR:", err.message);
  res.status(500).json({ error: 'Internal server error' });
}
});

// edit individual project details page
router.get('/id/edit', (req, res) => {

});

// project application page
router.get('/id/apply', (req, res) => {

});

module.exports = router;