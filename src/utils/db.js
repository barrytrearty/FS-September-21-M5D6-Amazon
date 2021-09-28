import pg from "pg";

const { Pool } = pg;

const { DATABASE_URL: connectionString } = process.env;

const pool = new Pool({
  connectionString,
});

export default pool;
