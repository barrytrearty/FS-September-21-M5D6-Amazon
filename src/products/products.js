// http://localhost:3001/products
import express from "express";
import createHttpError from "http-errors";
import multer from "multer";
import uniqid from "uniqid";
import { Result, validationResult } from "express-validator";
import { join, extname } from "path";
import {
  getProducts,
  writeProducts,
  publicPathFolder,
  savePhoto,
} from "./fs-tools.js";
import { productValidation } from "./validation.js";
import { getReviews } from "../reviews/fs-tools.js";
import fs from "fs-extra";
import pool from "../utils/db.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const productsRouter = express.Router();

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
  },
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const query = `SELECT * FROM products`;
    const result = await pool.query(query);
    console.log(result.rows);
    res.send(result.rows);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const productQuery = `SELECT * FROM products WHERE id = ${req.params.id}`;
    const productResult = await pool.query(productQuery);
    if (productResult.rows.length > 0) {
      const product = productResult.rows[0];
      const reviewsQuery = `SELECT * FROM reviews WHERE product_id=${req.params.id}`;
      const reviewsResult = await pool.query(reviewsQuery);
      const reviews = reviewsResult.rows;
      res.send({ product, reviews });
    } else {
      res
        .status(404)
        .send({ message: `Product- ${req.params.id} is not found` });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

productsRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const query = `
  INSERT INTO products
  (
    name, description, brand, image_url, price, category
  )
  VALUES 
  (
      ${"'" + name + "'"},
      ${"'" + description + "'"},
      ${"'" + brand + "'"},
      ${"'" + image_url + "'"},
      ${"'" + price + "'"},
      ${"'" + category + "'"}
  ) RETURNING *;
  `;
    const result = await pool.query(query);
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

productsRouter.put("/:id", async (req, res, next) => {
  try {
    const { name, description, brand, image_url, price, category } = req.body;
    const query = `
          UPDATE products 
          SET 
              name=${"'" + name + "'"},
              description=${"'" + description + "'"},
              brand=${"'" + brand + "'"},
              image_url=${"'" + image_url + "'"},
              price=${"'" + price + "'"},
              category=${"'" + category + "'"},
              updated_at= NOW()
          WHERE id=${req.params.id}
          RETURNING*;`;
    const result = await pool.query(query);
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const query = `DELETE FROM products WHERE id=${req.params.id};`;
    await pool.query(query);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

productsRouter.put(
  "/:id/cloudinaryUpload",
  multer({ storage: cloudinaryStorage }).single("image"),
  async (req, res, next) => {
    try {
      const query = `SELECT * FROM products`;
      const queryResults = await pool.query(query);
      const products = queryResults.rows;
      console.log(products);
      const index = products.findIndex(
        (prod) => prod.id === parseInt(req.params.id)
      );
      console.log(`INDEX: ${index}`);
      let prodToBeAltered = products[index];
      console.log(prodToBeAltered);
      console.log(req.file.path);
      const newImage = { image_url: req.file.path };
      const updatedProd = { ...prodToBeAltered, ...newImage };
      products[index] = updatedProd;
      res.send(updatedProd);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default productsRouter;
