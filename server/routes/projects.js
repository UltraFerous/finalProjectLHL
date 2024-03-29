const express = require('express');
const router = express.Router();


const { projectDataSearchID, findUsersWithProject, findTagsForProject, allProjectData, browseProjects, findPostsForProject, findProjectsByTag } = require('../db/queries/projects.js');

const { findProjectAdmin, findTagsForUser } = require('../db/queries/developers.js');

// import query helper functions and use them in routes

// projects list page
router.get('/', (req, res) => {
  allProjectData()
    .then((allProjectData) => {
      res.status(200).json(allProjectData);
    })
    .catch((err) => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// project search
router.get('/search/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;

  browseProjects(searchTerm)
    .then(projectData => {
      res.status(200).json(projectData);
    })
    .catch(err => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: "Internal server error" });
    });
});

// project search
router.get('/quicksearch/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;

  findTagsForUser(searchTerm)
    .then(userTags => {
      if (userTags.length === 0) {
        res.status(404).json({ error: 'No user data found to search with' });
      }
      const tagsOfUser = [];
      for (let tag in userTags) {
        tagsOfUser.push(userTags[tag].tag_id);
      }
      const promises = tagsOfUser.map(value => findProjectsByTag(value));
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

// project application page
router.get('/:id/apply', (req, res) => {
  const project_id = req.params.id;

  projectDataSearchID(project_id)
    .then((projectData) => {
      // Check if projectData exists
      if (projectData.length > 0) {
        res.status(200).json(projectData);
      } else {
        res.status(404).json({ error: 'Project not found' });
      }
    })
    .catch((err) => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// individual project details page
router.get('/:id/details', async (req, res) => {
  const project_id = req.params.id;

  let responseArray = [];

  // call first query helper func
  projectDataSearchID(project_id)
    .then(projectData => {
      responseArray.push(projectData);
      // call second query helper func
      return findUsersWithProject(project_id);
    })
    .then(developerData => {
      responseArray.push(developerData);
      // call third query helper func
      return findTagsForProject(project_id);
    })
    .then(projectTagData => {
      responseArray.push(projectTagData);
      return findProjectAdmin(project_id);
    })
    .then(projectAdminData => {
      responseArray.push(projectAdminData);
      return findPostsForProject(project_id);
    })
    .then(projectPostData => {
      responseArray.push(projectPostData);
    })
    .then(() => res.status(200).json(responseArray))
    .catch((err) => {
      console.error("ERROR:", err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;