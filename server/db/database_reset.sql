-- \i server/db/database_reset.sql
-- To reset database: cd into server, run "npm run-script reset"
-- The database should be called "final", and the username should be "labber"

DROP TABLE IF EXISTS account_types CASCADE;
\i db/schema/01_all_schema_DB.sql
\i db/seeds/01_all_seed_DB.sql
\! clear