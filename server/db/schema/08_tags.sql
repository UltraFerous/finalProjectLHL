-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS tags CASCADE;

CREATE TABLE tags (
  id SERIAL PRIMARY KEY NOT NULL,
  tag_name VARCHAR(255)
);
