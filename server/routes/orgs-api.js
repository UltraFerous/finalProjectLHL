const express = require('express');
const router = express.Router();
const { createOrgWithObject } = require('../db/queries/orgs-api.js');
const { orgDoubleCheck } = require('../db/queries/orgs.js');
// import query helper functions and use them in routes

// create new organization
router.post('/', (req, res) => {
  console.log("GOT:", req.body);

  orgDoubleCheck(req.body.name)
    .then((orgData) => {
      // Check if orgData exists
      if (orgData.length > 0) {
        res.status(404).json({ error: 'Organization Name Already In Use' });
      } else {
        return createOrgWithObject(req.body);
      }
    })
    .then(() => { res.status(200); })
    .catch((err) => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// edit organization details
router.patch('/:id', (req, res) => {

});

// delete organization
router.delete('/:id', (req, res) => {

});

module.exports = router;