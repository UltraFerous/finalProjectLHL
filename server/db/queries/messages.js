const { db } = require('../connection');

// select all message threads
const allMessageThreads = function(user) {
  return db
    .query(`
      SELECT DISTINCT ON (LEAST(dm.sender_id, dm.receiver_id), GREATEST(dm.sender_id, dm.receiver_id))
        dm.id,
        dm.sender_id,
        dm.receiver_id,
        sender.username as sender_username,
        sender.image as sender_image,
        receiver.username as receiver_username,
        receiver.image as receiver_image,
        dm.message_text,
        dm.sent_at,
        dm.is_read
      FROM direct_messages dm
      LEFT JOIN users sender ON dm.sender_id = sender.id
      LEFT JOIN users receiver ON dm.receiver_id = receiver.id
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
      UPDATE direct_messages
      SET is_read = true
      WHERE receiver_id = $1
      AND is_read = false;
    `, [userOne])
    .then(() => {
      return db.query(`    
        SELECT dm.*, sender.image AS sender_image, receiver.image AS receiver_image
        FROM direct_messages dm
        JOIN users sender ON dm.sender_id = sender.id
        JOIN users receiver ON dm.receiver_id = receiver.id
        WHERE (dm.sender_id = $1 AND dm.receiver_id = $2) OR (dm.sender_id = $2 AND dm.receiver_id = $1)
        ORDER BY dm.sent_at;
      `, [userOne, userTwo]);
    })
    .then(result => result.rows)
    .catch(err => console.log('ERROR:', err.message));
};

module.exports = {
  allMessageThreads,
  allMessages
};