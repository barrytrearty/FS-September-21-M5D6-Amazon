import express from "express";
import cors from "cors";
import { join } from "path";
import listEndpoints from "express-list-endpoints";
import reviewsAmazn from "./services/reviews/review.js";
import { genericErrHandl, customErrHand } from "./errorHandlers.js";
import productsImg from "./services/reviews/postImg.js";
// === Server ===
const server = express();
const port = 3003;
const publicFolderPath = join(process.cwd(), "public");
// === COnfiguration | Before endpoints! ===
server.use(express.static(publicFolderPath));
// body converter
server.use(cors());
server.use(express.json());

// ==== ROUTES / ENDPOINTS ====
server.use("/reviews", reviewsAmazn);
server.use("/products", productsImg);
// ERROR MIDDLEWARE
server.use(customErrHand);
server.use(genericErrHandl);
// Listen
server.listen(port, () => {
  console.log(port);
});
console.table(listEndpoints(server));
