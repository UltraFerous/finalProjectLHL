// load .env data into process.env
require('dotenv').config();

const { Pool } = require('pg');

const dbParams = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}

const db = new Pool(dbParams);

module.exports = {db};
