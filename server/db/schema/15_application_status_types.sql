DROP TABLE IF EXISTS project_status_types CASCADE;

CREATE TABLE application_status_types (
  status_id INTEGER PRIMARY KEY NOT NULL,
  status_type VARCHAR(255)
);