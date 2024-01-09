-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS organizations CASCADE;

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  website VARCHAR(255),
  user_id INTEGER DEFAULT 0,
  image VARCHAR(255) NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
