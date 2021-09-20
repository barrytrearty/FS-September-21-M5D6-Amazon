import express from "express";
import cors from "cors"
import productsRouter from "./servicies/products.js";
import { join } from "path"
import { badRequestErrorHandler, forbiddenErrorHandler, genericServerErrorHandler, notFoundErrorHandler } from "./errorHandlers.js";

const server = express();
const port = 3003;

const loggerMiddleware = (req, res, next) => {
  console.log(`Request method ${req.method} -- Request URL ${req.url}`);
  next();
};

server.use(loggerMiddleware);
server.use(cors())
server.use(express.json())
const publicFolderPath = join(process.cwd(), "../../public/img")
server.use(express.static(publicFolderPath))

server.use("/products", productsRouter);
server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(forbiddenErrorHandler)
server.use(genericServerErrorHandler)
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
