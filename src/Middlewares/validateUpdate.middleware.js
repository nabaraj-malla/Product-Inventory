import { body, validationResult } from "express-validator";
import ProductModel from "../Models/product.model.js";

export const validateUpdateRequest = async (req, res, next) => {
  // 1. Setup rules for validation
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a positive value"),
    body("imageURL").custom((value, { req }) => {
      if (!req.file && !req.body.currentImageURL) {
        throw new Error("Image is required");
      }
      return true;
    }),
    // body("imageURL").isURL().withMessage("Invalid URL"),
  ];

  // 2. Running above rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. Checking any errors after running the rules
  var validationErrors = validationResult(req);
  // console.log("validation errors:", validationErrors);

  // 4. if error returns error message
  if (!validationErrors.isEmpty()) {
    const { id } = req.body;
    let product = ProductModel.getProductById(id);
    return res.render("update-product", {
      product,
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  next();
};
