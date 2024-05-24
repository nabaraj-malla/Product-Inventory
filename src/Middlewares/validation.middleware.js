import { body, validationResult } from "express-validator";

export const validateRequest = async (req, res, next) => {
  // 1. Setup rules for validation
  // console.log(req.body);
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be a positive value"),
    body("imageURL").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ];
  // In above code value refers to the value in imageURL
  // 2. Running above rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  // console.log("result", result);

  // 3. Checking any errors after running the rules
  var validationErrors = validationResult(req);
  // console.log("validation errors:", validationErrors);

  // 4. if error returns error message
  if (!validationErrors.isEmpty()) {
    return res.render("new-product", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }

  next();
};
