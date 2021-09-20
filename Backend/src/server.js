import express from "express";
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import productsRouter from "./servicies/products.js";

const server = express();
const port = 3001;

const loggerMiddleware = (req, res, next) => {
  console.log(`Request method ${req.method} -- Request URL ${req.url}`);
  next();
};

server.use(loggerMiddleware);
server.use(cors())
server.use(express.json())


server.use("/products", productsRouter);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
