-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS assigned_tags_projects CASCADE;

CREATE TABLE assigned_tags_projects (
  project_id INTEGER,
  tag_id INTEGER,
  FOREIGN KEY(project_id) REFERENCES projects(id),
  FOREIGN KEY(tag_id) REFERENCES tags(id)
);
