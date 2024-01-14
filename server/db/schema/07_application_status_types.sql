DROP TABLE IF EXISTS application_status_types CASCADE;

CREATE TABLE application_status_types (
  id INTEGER PRIMARY KEY NOT NULL,
  status_type VARCHAR(255)
);