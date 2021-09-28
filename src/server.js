import express from "express";
import cors from "cors";
import { join } from "path";
import listEndpoints from "express-list-endpoints";
import reviewsAmazn from "./services/reviews/review.js";
import productsRouter from "./servicies/products.js";
import { genericErrHandl, customErrHand } from "./errorHandlers.js";
// === Server ===
const loggerMiddleware = (req, res, next) => {
  console.log(`Request method ${req.method} -- Request URL ${req.url}`);
  next();
};
const server = express();
const port = 3003;
const publicFolderPath = join(process.cwd(), "public");
// === COnfiguration | Before endpoints! ===
server.use(loggerMiddleware);
server.use(express.static(publicFolderPath));
// body converter
server.use(cors());
server.use(express.json());

// ==== ROUTES / ENDPOINTS ====
server.use("/products", productsRouter);
server.use("/reviews", reviewsAmazn);
// ERROR MIDDLEWARE
server.use(customErrHand);
server.use(genericErrHandl);
// Listen
server.listen(port, () => {
  console.log(port);
});
console.table(listEndpoints(server));
