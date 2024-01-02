-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY NOT NULL,
  text VARCHAR(255),
  project_id INTEGER,
  FOREIGN KEY(project_id) REFERENCES projects(id)
);
