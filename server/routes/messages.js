const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const { allMessages, allMessageThreads } = require('../db/queries/messages');

router.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000, // Example: 1 day
  })
);

// get message threads for a single user
router.get('/', (req, res) => {
  const currentUserId = req.session.userId;

  allMessageThreads(currentUserId)
    .then(threadsData => {
      console.log(threadsData);
      res.status(200).json(threadsData);
    })
    .catch(err => {
      console.error('ERROR:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// get all messages between two users
router.get('/:otherUserId', (req, res) => {
  const currentUserId = req.session.userId;
  const otherUserId = req.params.otherUserId;

  // call helper query func to return all messages between two users
  allMessages(currentUserId, otherUserId)
    .then(messageData => {
      res.status(200).json(messageData);
    })
    .catch(err => {
      console.error('ERROR:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;