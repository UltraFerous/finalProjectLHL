-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  admin BOOLEAN DEFAULT false,
  password VARCHAR(255) NOT NULL,
  description TEXT,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  UNIQUE (email)
);

