const express = require('express');
const router = express.Router();
const { orgDataSearchID, orgDataSearchName, allOrgData, checkOrgAdmin } = require('../db/queries/orgs.js');
const { findProjectsForOrg } = require('../db/queries/projects.js');

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

  let responseArray = [];

  orgDataSearchID(org_id)
    .then((orgData) => {
        responseArray.push(orgData);
        return findProjectsForOrg(org_id);
    })
    .then((projectData) => {
      responseArray.push(projectData);
      return checkOrgAdmin(org_id);
  })
  .then((orgAdminData) => {
    responseArray.push(orgAdminData);
  })
    .then(() => {
      console.log(responseArray);
      res.status(200).json(responseArray);
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