-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS project_status_types CASCADE;

CREATE TABLE project_status_types (
  status_id INTEGER PRIMARY KEY NOT NULL,
  status_type VARCHAR(255)
);