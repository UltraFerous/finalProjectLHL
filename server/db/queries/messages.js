const { db } = require('../connection');

// read messages between two users organized chronologically
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
  allMessages
};