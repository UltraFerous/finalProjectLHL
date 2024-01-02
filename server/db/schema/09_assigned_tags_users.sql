-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS assigned_tags_users CASCADE;

CREATE TABLE assigned_tags_users (
  user_id INTEGER,
  tag_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(tag_id) REFERENCES tags(id)
);
