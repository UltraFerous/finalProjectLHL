const { db } = require('../connection');

// select all message threads
const allMessageThreads = function(user) {
  return db
    .query(`
      SELECT DISTINCT ON (LEAST(dm.sender_id, dm.receiver_id), GREATEST(dm.sender_id, dm.receiver_id))
        dm.id,
        dm.sender_id,
        dm.receiver_id,
        u.username as receiver_username,
        u.image as receiver_image,
        dm.message_text,
        dm.sent_at,
        dm.is_read
      FROM direct_messages dm
      LEFT JOIN users u ON dm.receiver_id = u.id
      WHERE dm.sender_id = $1 OR dm.receiver_id = $1
      ORDER BY LEAST(dm.sender_id, dm.receiver_id), GREATEST(dm.sender_id, dm.receiver_id), dm.sent_at DESC;
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