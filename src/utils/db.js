import pg from "pg";

const { Pool } = pg;

const { DEPLOYED_DATABASE_URL: connectionString } = process.env;

// const sslConfig = isProduction
//   ? {
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     }
//   : {};

const sslConfig = {
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool({
  connectionString,
  ...sslConfig,
});

export default pool;
