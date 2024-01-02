-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS linked_users_posts CASCADE;

CREATE TABLE linked_users_posts (
  post_id INTEGER,
  user_id INTEGER,
  FOREIGN KEY(post_id) REFERENCES posts(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);
