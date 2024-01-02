-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS developers_information CASCADE;

CREATE TABLE developers_information (
  user_id INTEGER,
  linkedin VARCHAR(255),
  github VARCHAR(255),
  website VARCHAR(255),
  FOREIGN KEY(user_id) REFERENCES users(id)
);