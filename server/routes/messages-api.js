const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const { sendMessage } = require('../db/queries/messages-api');

router.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000, // Example: 1 day
  })
);

// write a message
router.post('/:userId/:otherUserId', (req, res) => {
  const currentUserId = req.params.userId;
  const otherUserId = req.params.otherUserId;
  const messageText = req.body.messageText;

  // call helper query function to post new message to database
  sendMessage(currentUserId, otherUserId, messageText)
    .then(messageData => {
      res.status(200).json(messageData);
    })
    .catch(err => {
      console.error('ERROR:', err.message);
      res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;