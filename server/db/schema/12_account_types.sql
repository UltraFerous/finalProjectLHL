-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS account_types CASCADE;

CREATE TABLE account_types (
  user_type INTEGER PRIMARY KEY NOT NULL,
  account_type VARCHAR(255)
);