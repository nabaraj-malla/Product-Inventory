import { body, validationResult } from "express-validator";

export const validateRegistration = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("invalid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should have minimum 8 character"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  var validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.render("register", {
      errorMessage: validationErrors.array()[0].msg,
    });
  }
  next();
};
