const express = require('express');
const router = express.Router();
const { orgDataSearchID, orgDataSearchName, allOrgData } = require('../db/queries/orgs.js');
const { createOrgWithObject } = require('../db/queries/orgs-api.js');

// organization search
router.get('/search/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;

  orgDataSearchName(searchTerm)
    .then((orgData) => {
      if (orgData.length > 0) {
        res.status(200).json(orgData);
      }
    })
    .catch((err) => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// organization details page
router.get('/:id', (req, res) => {
  const org_id = req.params.id;

  orgDataSearchID(org_id)
    .then((orgData) => {
      console.log(orgData);

      // Check if orgData exists
      if (orgData.length > 0) {
        res.status(200).json(orgData);
      } else {
        res.status(404).json({ error: 'Project not found' });
      }
    })
    .catch((err) => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.get('/', (req, res) => {
  allOrgData()
  .then((allOrgData) => {
    res.status(200).json(allOrgData);
  })
  .catch((err) => {
    console.error("ERROR:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  });
})

module.exports = router;