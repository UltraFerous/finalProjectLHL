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

// get all message threads for logged in user
router.get('/:userId', (req, res) => {
  const currentUserId = req.params.userId;

  // call helper query function
  allMessageThreads(currentUserId)
    .then(threadsData => {
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

  // call helper query function
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