import express from "express";
import { getReviews, writeReviews } from "../fs-tools.js";
import createHttpError from "http-errors";
import uniqid from "uniqid";
import { postValidation, reviewIdCheck } from "./MiddleWare.js";
import { validationResult } from "express-validator";

const reviewsAmazn = express.Router();

// === GETT
reviewsAmazn.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.send(reviews);
  } catch (err) {
    next(createHttpError(401, "Bad request"));
  }
});
// === POST
reviewsAmazn.post("/", postValidation, async (req, res, next) => {
  const errorList = validationResult(req);
  if (!errorList.isEmpty()) {
    next(createHttpError(400, { errorList }));
  } else {
    try {
      const reviews = await getReviews();
      let newReview = { ...req.body, _id: uniqid(), createdAt: new Date() };
      reviews.push(newReview);
      await writeReviews(reviews);
      res.send(["Success!", newReview]);
    } catch (err) {
      next(createHttpError(401, "Bad request"));
    }
  }
});
// === PUT
reviewsAmazn.put(
  "/:comentId",
  reviewIdCheck,
  postValidation,
  async (req, res, next) => {
    const errorList = validationResult(req);
    if (!errorList.isEmpty()) {
      next(createHttpError(400, { errorList }));
    } else {
      try {
        const reviews = await getReviews();
        let newReview = { ...req.body, _id: uniqid(), createdAt: new Date() };
        reviews.push(newReview);
        await writeReviews(reviews);
        res.send(["Success!", newReview]);
      } catch (err) {
        next(createHttpError(401, "Bad request"));
      }
    }
  }
);
//  === DELETE
reviewsAmazn.delete("/:comentId", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    console.log(req.params.comentId);
    console.log(reviews);

    let filteredRev = reviews.filter((rev = rev._id != req.params.comentId));
    console.log(filteredRev);

    await writeReviews(filteredRev);
    res.status(200).send("OK");
  } catch (err) {
    next(createHttpError(500, ""));
  }
});
export default reviewsAmazn;
