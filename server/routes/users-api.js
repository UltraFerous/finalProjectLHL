const express = require('express');
const router = express.Router();

// import query helper functions and use them in routes

// create new user
router.post('/', (req, res) => {

});

// edit user profile
router.patch('/:id', (req, res) => {

});

// delete user profile
router.delete('/:id', (req, res) => {

});

// log user in
router.post('/login', (req, res) => {

});

// register new user
router.post('/register', (req, res) => {

});

module.exports = router;