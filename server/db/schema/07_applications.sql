-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS applications CASCADE;

CREATE TABLE applications (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER,
  project_id INTEGER,
  text TEXT,
  status INTEGER DEFAULT 0,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(project_id) REFERENCES projects(id)
);
