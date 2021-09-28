import pg from "pg";

const { Pool } = pg;

const { DEPLOYED_DATABASE_URL, DEV_DATABASE_URL, NODE_ENV } = process.env;
const isProduction = NODE_ENV === "production";

const connectionString = isProduction
  ? DEPLOYED_DATABASE_URL
  : DEV_DATABASE_URL;

const sslConfig = isProduction
  ? {
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {};

const pool = new Pool({
  connectionString,
  ...sslConfig,
});

export default pool;
