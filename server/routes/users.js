const express = require('express');
const router = express.Router();
const { userDataSearchID } = require("../db/queries/users.js");
const { findTagsForUser } = require("../db/queries/developers.js");

// import query helper functions and use them in routes

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
    })
    .then(() => res.status(200).json(responseArray))
    .catch((err) => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;