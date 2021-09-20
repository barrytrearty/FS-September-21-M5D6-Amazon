import express from "express";
import {
  coverPath,
  getReviews,
  imgName,
  saveCoverFile,
  writeReviews,
} from "../fs-tools.js";
import multer from "multer";
// CONST
const productsImg = express.Router();
// POST IMG
productsImg.put(
  "/:imgId/upload",
  multer({
    fileFilter: (req, file, cb) => {
      if (file.mimetype != "image/jpeg" && file.mimetype != "image/png")
        cb(createHttpError(400, "Format not suported!"), false);
      else cb(null, true);
    },
  }).single("image"),
  async (req, res, next) => {
    try {
      const imageName = imgName(req.file.originalname, req.params.imgId);
      await saveCoverFile(imageName, req.file.buffer);
      //   save the url
      const products = await getReviews(); // CHange to getProducts
      console.log(imageName);
      const index = products.findIndex((pr) => pr._id === req.params.imgId);
      products[index] = {
        ...products[index],
        coverImg: `${coverPath}/${imageName}`,
      };
      console.log(products[index]);
      await writeReviews(products); // CHANGE TO writeProducts
      res.status(200).send(imageName);
    } catch (err) {
      next(err);
    }
  }
);
export default productsImg;
