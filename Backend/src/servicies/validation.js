import { body } from "express-validator"

export const productValidation = [
  body("name").exists().withMessage("name is a mandatory field!"),
  body("description").exists().withMessage("description is a mandatory field!"),
  body("brand").exists().withMessage("brand is a mandatory field!"),
  body("price").exists().isNumeric().withMessage("price is a mandatory field!"),
  body("category").exists().withMessage("category is a mandatory field!"),
]