import express from "express";
import cors from "cors"
import productsRouter from "./servicies/products.js";
import { join } from "path"

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
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
