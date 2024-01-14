const { db } = require('../connection');

// select all message threads
const allMessageThreads = function(user) {
  return db
    .query(`
      SELECT DISTINCT ON (LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id))
        id,
        sender_id,
        receiver_id,
        message_text,
        sent_at
      FROM direct_messages
      WHERE sender_id = $1 OR receiver_id = $1
      ORDER BY LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id), sent_at DESC;
    `, [user])
    .then(result => result.rows)
    .catch(err => {
      console.log('ERROR:', err.message)
      res.status(500).json({ error: 'Internal server error' });
    });
};

// select messages between two users organized chronologically
const allMessages = function(userOne, userTwo) {
  return db
    .query(`
      SELECT * FROM direct_messages
      WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY sent_at;
    `, [userOne, userTwo])
    .then(result => result.rows)
    .catch(err => console.log('ERROR:', err.message));
};

module.exports = {
  allMessageThreads,
  allMessages
};