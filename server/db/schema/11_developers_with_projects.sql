-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS developers_with_projects CASCADE;

CREATE TABLE developers_with_projects (
  project_id INTEGER,
  user_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(project_id) REFERENCES projects(id)
);