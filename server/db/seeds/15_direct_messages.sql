-- Seed messages
INSERT INTO direct_messages (sender_id, receiver_id, message_text)
VALUES
  (1, 2, 'Hey there!'),
  (1, 3, 'How are you doing?'),
  (1, 4, 'Nice to meet you!'),
  (1, 5, 'What is up?'),
  (1, 6, 'Greetings!'),
  (1, 7, 'Hello from User 1!'),
  (1, 8, 'Hi!'),
  (1, 9, 'How is your day?'),
  (1, 10, 'Good to see you!'),

  (2, 1, 'Hi there yourself!'),
  (2, 3, 'Hi!'),
  (2, 4, 'Hello from User 2!'),
  (2, 5, 'Hey, how is it going?'),
  (2, 6, 'Nice to meet you!'),
  (2, 7, 'Greetings!'),
  (2, 8, 'What is up?'),
  (2, 9, 'How are you doing?'),
  (2, 10, 'Good to see you!'),

  (3, 4, 'Hey there!'),
  (3, 5, 'How are you doing?'),
  (3, 6, 'Nice to meet you!'),
  (3, 7, 'What is up?'),
  (3, 8, 'Greetings!'),
  (3, 9, 'Hello from User 3!'),
  (3, 10, 'Hi!'),

  (4, 5, 'Hey, how is it going?'),
  (4, 6, 'Hello from User 4!'),
  (4, 7, 'Nice to meet you!'),
  (4, 8, 'Greetings!'),
  (4, 9, 'What is up?'),
  (4, 10, 'How are you doing?'),

  (5, 2, 'Hey there!'),
  (5, 3, 'How are you doing?'),
  (5, 4, 'Nice to meet you!'),
  (5, 4, 'What is up?'),
  (5, 6, 'Greetings!'),
  (5, 7, 'Hello from User 5!'),
  (5, 8, 'Hi!'),
  (5, 9, 'How is your day?'),
  (5, 10, 'Good to see you!'),

  (6, 3, 'Hi!'),
  (6, 4, 'Hello from User 6!'),
  (6, 5, 'Hey, how is it going?'),
  (6, 7, 'Nice to meet you!'),
  (6, 7, 'Greetings!'),
  (6, 8, 'What is up?'),
  (6, 9, 'How are you doing?'),
  (6, 10, 'Good to see you!'),

  (7, 4, 'Hey there!'),
  (7, 5, 'How are you doing?'),
  (7, 6, 'Nice to meet you!'),
  (7, 6, 'What is up?'),
  (7, 8, 'Greetings!'),
  (7, 9, 'Hello from User 7!'),
  (7, 10, 'Hi!'),

  (8, 5, 'Hey, how is it going?'),
  (8, 6, 'Hello from User 8!'),
  (8, 7, 'Nice to meet you!'),
  (8, 9, 'Greetings!'),
  (8, 9, 'What is up?'),
  (8, 10, 'How are you doing?'),

  (9, 2, 'Hey there!'),
  (9, 3, 'How are you doing?'),
  (9, 4, 'Nice to meet you!'),
  (9, 4, 'What is up?'),
  (9, 6, 'Greetings!'),
  (9, 7, 'Hello from User 9!'),
  (9, 8, 'Hi!'),
  (9, 8, 'How is your day?'),
  (9, 10, 'Hello from User 9!');
  (9, 10, 'Good to see you!'),

  (10, 4, 'Hey there!'),
  (10, 5, 'How are you doing?'),
  (10, 6, 'Nice to meet you!'),
  (10, 7, 'What is up?'),
  (10, 8, 'Greetings!'),
  (10, 9, 'Hello from User 10!'),
  (10, 9, 'Hi!');

-- Update sent_at with the current timestamp
UPDATE direct_messages SET sent_at = CURRENT_TIMESTAMP;
