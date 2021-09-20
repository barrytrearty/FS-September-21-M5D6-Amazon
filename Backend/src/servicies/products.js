// http://localhost:3001/products
import express from "express";
import createHttpError from "http-errors";
import multer from "multer";
import uniqid from "uniqid";
import { validationResult } from "express-validator";
import { join, extname } from "path";
import {
  getProducts,
  writeProducts,
  publicPathFolder,
  savePhoto,
} from "./fs-tools.js";
import { productValidation } from "./validation.js";
import { getReviews } from "../services/fs-tools.js";
import fs from "fs-extra";
// import { uploadFile } from "./fs-tools.js";

const productsRouter = express.Router();
// productsRouter.get("/", async (req, res, next) => {
//   try {
//     const products = await getProducts();
//     res.send(products);
//   } catch (error) {
//     next(error);
//   }
// });
// get by category
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getProducts();
    if (req.query && req.query.category) {
      const productsByCategory = products.find(
        (p) => p.category === req.query.category
      );
      res.send(productsByCategory);
    } else {
      res.send(products);
    }
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const products = await getProducts();
    const product = products.find((p) => p.id == req.params.id);
    console.log("product:", product);
    console.log("products:", products);
    if (product) {
      res.send(product);
    } else {
      next(createHttpError(404, `product with ID ${req.params.id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

// GET REVIEWS
productsRouter.get("/:id/reviews", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    const filteredRev = reviews.filter((p) => p.productId === req.params.id);
    res.send(filteredRev);
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/", productValidation, async (req, res, next) => {
  const errorList = validationResult(req);
  if (!errorList.isEmpty()) {
    next(createHttpError(400, errorList));
  }
  try {
    const newProduct = {
      id: uniqid(),
      ...req.body,

      createdAt: new Date(),
    };
    const products = await getProducts();
    products.push(newProduct);
    await writeProducts(products);
    res.status(201).send(newProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.put("/:id", async (req, res, next) => {
  try {
    const products = await getProducts();
    const index = products.findIndex((p) => p.id === req.params.id);
    const productToModify = products[index];
    const updatedProductBody = { ...req.body };
    const updatedProduct = {
      ...productToModify,
      ...updatedProductBody,
      updatedAt: new Date(),
    };
    products[index] = updatedProduct;
    await writeProducts(products);
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.put(
  "/:id/uploadimage",
  multer().single("image"),
  // uploadFile,
  async (req, res, next) => {
    try {
      const { originalname, buffer } = req.file;
      const extension = extname(originalname);
      const fileName = `${req.params.id}${extension}`;
      console.log(`originalname: ${originalname}`);
      console.log(`fileName: ${fileName}`);

      await fs.writeFile(join(publicPathFolder, fileName), buffer);

      const products = await getProducts();
      const index = products.findIndex((p) => p.id === req.params.id);
      console.log(index);
      const productToModify = products[index];

      const link = `http://localhost:3003/${fileName}`;
      req.file = link;
      const newPhoto = { imageUrl: req.file };
      const updatedProduct = {
        ...productToModify,
        ...newPhoto,
        updatedAt: new Date(),
      };

      products[index] = updatedProduct;
      await writeProducts(products);
      res.send(updatedProduct);
    } catch (error) {
      console.log(error);
    }
  }
);

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const products = await getProducts();
    const filteredProducts = products.filter(
      (product) => product.id !== req.params.id
    );
    await writeProducts(filteredProducts);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
// upload photo
productsRouter.post(
  "/:id/uploadPhoto",
  multer({
    fileFilter: (req, file, cb) => {
      if (file.mimetype != "image/jpeg" && file.mimetype != "image/png")
        cb(createHttpError(400, "Format not suported!"), false);
      else cb(null, true);
    },
  }).single("photoKey"),
  async (req, res, next) => {
    try {
      let nameOfPhoto = `${req.params.id}.${
        req.file.originalname.split(".").reverse()[0]
      }`;
      let urlPhoto = `http://localhost:3003/${nameOfPhoto}`;
      await savePhoto(nameOfPhoto, req.file.buffer);
      // products
      const products = await getProducts();
      const index = products.findIndex((p) => p.id == req.params.id);
      const updatedProduct = {
        ...products[index],
        imageUrl: urlPhoto,
      };
      products[index] = updatedProduct;
      await writeProducts(products);
      res.send(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

export default productsRouter;
