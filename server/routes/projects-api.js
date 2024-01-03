const express = require('express');
const router = express.Router();

// import query helper functions and use them in routes

// create new project
router.post('/', (req, res) => {

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