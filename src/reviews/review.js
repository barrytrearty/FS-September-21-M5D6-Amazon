import express from "express";
import { getReviews, writeReviews } from "./fs-tools.js";
import createHttpError from "http-errors";
import uniqid from "uniqid";
import { postValidation, reviewIdCheck } from "./MiddleWare.js";
import { validationResult } from "express-validator";
import pool from "../utils/db.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/", async (req, res, next) => {
  try {
    const query = `SELECT * FROM reviews`;
    const result = await pool.query(query);
    console.log(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

reviewsRouter.get("/:id", async (req, res, next) => {
  try {
    const query = `SELECT 
    review.id,
    review.comment,
    review.rate,
    review.created_at,
    product.name AS product_name,
    product.brand,
    product.category
FROM reviews as review
INNER JOIN products AS product ON review.product_id = product.id WHERE review.id = ${req.params.id}`;
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      console.log(result.rows[0]);
      res.send(result.rows[0]);
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

reviewsRouter.post("/", async (req, res, next) => {
  try {
    const { comment, rate, product_id } = req.body;
    const query = `
  INSERT INTO reviews
  (
    comment, rate, product_id
  )
  VALUES 
  (
      ${"'" + comment + "'"},
      ${"'" + rate + "'"},
      ${"'" + product_id + "'"}
  ) RETURNING *;
  `;
    const result = await pool.query(query);
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

reviewsRouter.put("/:id", async (req, res, next) => {
  try {
    const { comment, rate, product_id } = req.body;
    const query = `
          UPDATE reviews 
          SET 
              comment=${"'" + comment + "'"},
              rate=${"'" + rate + "'"},
              product_id=${"'" + product_id + "'"}
          WHERE id=${req.params.id}
          RETURNING*;`;
    const result = await pool.query(query);
    res.send(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

reviewsRouter.delete("/:id", async (req, res, next) => {
  try {
    const query = `DELETE FROM reviews WHERE id=${req.params.id};`;
    await pool.query(query);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default reviewsRouter;
