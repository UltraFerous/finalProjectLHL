const { db } = require('../connection');

// write new message between two users and display it to page
const sendMessage = function(sender, receiver, messageText) {
  return db
    .query(`
      INSERT INTO direct_messages (sender_id, receiver_id, message_text)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [sender, receiver, messageText])
    .then(result => result.rows[0])
    .catch(err => console.log(error('ERROR:', err.message)));
};

module.exports = {
  sendMessage
};