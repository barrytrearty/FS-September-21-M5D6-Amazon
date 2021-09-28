import pool from "./db.js";

const query = `
--DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS
products(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    brand VARCHAR (75) NOT NULL,
    price INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    category VARCHAR (50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- DROP TABLE IF EXISTS reviews;
CREATE TABLE IF NOT EXISTS
reviews(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    comment TEXT NOT NULL,
    rate INTEGER NOT NULL,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
    );`;

const createTables = async () => {
  try {
    await pool.query(query);
    console.log("Tables are created");
  } catch (error) {
    console.log({ message: error });
  }
};

export default createTables;
