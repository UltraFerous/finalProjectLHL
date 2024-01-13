const express = require('express');
const router = express.Router();
const { allUserData, browseUsersTag } = require("../db/queries/users.js");
const { findTagsForProject } = require("../db/queries/projects.js");
const { findUsersByTagDetails } = require("../db/queries/developers.js");
// import query helper functions and use them in routes

// developers list page
router.get('/', (req, res) => {
  allUserData()
    .then((userData) => {
      console.log('userData:', userData);
      const developersArray = userData.filter((user) => !user.admin);
      res.status(200).json(developersArray);
    })
    .catch((err) => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// developer search
router.get('/search/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;

  browseUsersTag(searchTerm)
    .then((userData) => {
      res.status(200).json(userData)
    })
    .catch(err => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: "Internal server error" });
    });
});

// quick developer search WORK HERE
router.get('/quicksearch/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;

  findTagsForProject(searchTerm)
    .then(projectTags => {
      if (projectTags.length === 0) {
        res.status(404).json({ error: 'No user data found to search with' });
      }
      const tagsOfProject = [];
      for (let tag in projectTags) {
        tagsOfProject.push(projectTags[tag].tag_id);
      }
      const promises = tagsOfProject.map(value => findUsersByTagDetails(value));
      Promise.all(promises)
      .then(projectResults => {
        console.log("Sent!");
        console.log(projectResults);
        res.status(200).json(projectResults);
      })
      .catch(err => {
        console.error("ERROR:", err.message);
        res.status(500).json({ error: "Internal server error" });
      });
    })
    .catch(err => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;