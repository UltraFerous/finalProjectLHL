const express = require('express');
const router = express.Router();
const { allUserData } = require("../db/queries/users.js");

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

module.exports = router;