-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status INTEGER,
  online BOOLEAN DEFAULT true,
  organization_id INTEGER,
  image VARCHAR(255) NOT NULL,
  FOREIGN KEY(organization_id) REFERENCES organizations(id)
);
