import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import ProductController from "./src/Controllers/product.controller.js";
import { validateRequest } from "./src/Middlewares/validation.middleware.js";
import { validateUpdateRequest } from "./src/Middlewares/validateUpdate.middleware.js";
import { uploadFile } from "./src/Middlewares/file-upload.middleware.js";
import UserController from "./src/Controllers/user.controller.js";
import { validateRegistration } from "./src/Middlewares/registration.middleware.js";
import session from "express-session";
import { auth } from "./src/Middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/Middlewares/lastVisit.middleware.js";

const server = express();

server.use(
  session({
    secret: "N@bar@j2057",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

server.use(cookieParser());
// server.use(setLastVisit);
server.use(express.json());
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "Views"));
server.use(ejsLayouts);
server.use(express.static("public"));
server.use(express.static("src/Views"));
server.use(express.urlencoded({ extended: true }));

const productController = new ProductController();
const userController = new UserController();

// Product Routes
server.get("/", setLastVisit, auth, productController.getProducts);
server.get("/new", auth, productController.getAddForm);
server.post(
  "/",
  auth,
  uploadFile.single("imageURL"),
  validateRequest,
  productController.addNewProduct
);
server.get("/update-product/:iD", productController.getUpdateProductView);

server.post(
  "/update-product",
  auth,
  uploadFile.single("imageURL"),
  validateUpdateRequest,
  productController.handleProductUpdate
);
server.post("/delete-product/:iD", auth, productController.handleDeleteProduct);

// User Routes
server.get("/register", userController.getRegister);
server.get("/login", userController.getLogin);
server.post(
  "/register",
  validateRegistration,
  userController.handleUserRegister
);

server.post("/login", userController.handleUserLogin);
server.get("/logout", userController.handleUserLogout);
// server.use(setLastVisit);

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Server is listening at PORT no. ${PORT}`);
});
