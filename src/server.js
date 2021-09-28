import express from "express";
import cors from "cors";
import { join } from "path";
import listEndpoints from "express-list-endpoints";
import reviewsRouter from "./reviews/review.js";
import productsRouter from "./products/products.js";
import { genericErrHandl, customErrHand } from "./errorHandlers.js";
import pool from "./utils/db.js";
import createTables from "./utils/create-table.js";
import { create } from "domain";

// === Server ===

const server = express();
const port = process.env.PORT || 3003;
const publicFolderPath = join(process.cwd(), "public");
// === COnfiguration | Before endpoints! ===

server.use(express.static(publicFolderPath));
// body converter
// server.use(cors());
server.use(express.json());

// ==== ROUTES / ENDPOINTS ====
server.use("/products", productsRouter);
server.use("/reviews", reviewsRouter);

// ERROR MIDDLEWARE
server.use(customErrHand);
server.use(genericErrHandl);
// Listen
server.listen(port, async () => {
  console.log(port);
  // console.log(process.env.PGPASSWORD);
  // const result = await pool.query("SELECT NOW()");
  // console.log(result);
  await createTables();
});
console.table(listEndpoints(server));
