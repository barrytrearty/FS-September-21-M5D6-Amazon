// http://localhost:3001/products
import express from "express";
import createHttpError from "http-errors";
import uniqid from "uniqid";
import multer from "multer"
import { validationResult } from "express-validator"
import { getProducts, savePhoto, writeProducts } from "./fs-tools.js";
import { productValidation } from "./validation.js";
import { write } from "fs-extra";

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
      if (req.query && req.query.category){
           const productsByCategory = products.find((p) => p.category === req.query.category);
           res.send(productsByCategory)
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
  const errorList = validationResult(req)
  if (!errorList.isEmpty()){
      next(createHttpError(400, (errorList)))
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
    const index = products.findIndex(p => p.id === req.params.id)
    const productToModify = products[index]
    const updatedProductBody = {...req.body }
    const updatedProduct = { ...productToModify, ...updatedProductBody, updatedAt: new Date()}
    products[index] = updatedProduct
    await writeProducts(products)
    res.send(updatedProduct)
  } catch (error) {
    next(error);  
  }
});

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

//upload photo
productsRouter.post("/:id/uploadPhoto", multer({
    fileFilter: (req, file, cb) => {
            if (file.mimetype != "image/jpeg" && file.mimetype != "image/png"  && file.mimetype != "image/jpg")
              cb(createHttpError(400, "Format not suported!"), false);
               else cb(null, true);}
       }).single("photoKey"),
 async (req, res, next) => {
    try {
        // await savePhoto("photoKey", req.file.buffer)
        let nameOfPhoto = `${req.params.query}`;
        await savePhoto(nameOfPhoto, req.file.buffer)
        const products = await getProducts();
        const index = products.findIndex((p) => p.id == req.params.id);
        const updatedProduct = {
            ...products[index],
            imageUrl: nameOfPhoto,
          };
          products[index] = updatedProduct
          await writeProducts(updatedProduct)
        res.send(updatedProduct)
    } catch (error) {
        next(error);
    }
}
)

 export default productsRouter;
