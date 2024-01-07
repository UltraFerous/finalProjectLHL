const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const { userDataSearchName } = require('../db/queries/users.js');


router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000, // Example: 1 day
}));
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
  const { username, password } = req.body;

  // Check if the user exists
  userDataSearchName(username)
    .then((users) => {
      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      // User found, now check if passwords match
      const user = users[0];
      if (password === user.password) {
        // Passwords match, set user ID in the session cookie
        req.session.userId = user.id;

        //Send user data as response
        const { id, username, email } = user;
        res.status(200).json({ user: { id, username, email } });
      } else {
        // Passwords don't match
        res.status(401).json({ error: 'Incorrect password' });
      }
    })
    .catch((error) => {
      console.error("Error during login:", error.message);
      res.status(500).json({ error: 'Internal server error' });
    });
  

});

// log user out
router.post('/logout', (req, res) => {
  req.session = null;
});

// register new user
router.post('/register', (req, res) => {
  
});

module.exports = router;