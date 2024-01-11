const express = require('express');
const router = express.Router();
const { userDataSearchID, browseUsersTag } = require("../db/queries/users.js");
const { findTagsForUser, findUserProjects } = require("../db/queries/developers.js");

// user search
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

// user details page
router.get('/:id/details', (req, res) => {
  const user_id = req.params.id;

  let responseArray = [];

  // call first query helper func
  userDataSearchID(user_id)
    .then(userData  => {
      responseArray.push(userData);
      // call second query helper func
      return findTagsForUser(user_id);
    })
    .then(userTagData => {
      responseArray.push(userTagData);
      // call second query helper func
      return findUserProjects(user_id);
    })
    .then(userProjectData => {
      responseArray.push(userProjectData);
    })
    .then(() => res.status(200).json(responseArray))
    .catch((err) => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;