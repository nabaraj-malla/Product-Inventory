import ProductModel from "../Models/product.model.js";
import UserModel from "../Models/user.model.js";

export default class UserController {
  getRegister(req, res, next) {
    return res.render("register", {
      errorMessage: null,
    });
  }

  getLogin(req, res) {
    return res.render("login", { errorMessage: null });
  }

  handleUserRegister(req, res) {
    // const { name, email, password } = req.body;
    // console.log(name, email, password);
    UserModel.addNewUser(req.body);
    console.log(UserModel.getAllUsers());
    return res.render("login", {
      errorMessage: null,
    });
  }

  handleUserLogin(req, res) {
    const { email, password } = req.body;
    const validUser = UserModel.isValidUser(email, password);
    console.log("validUser", validUser);
    if (validUser) {
      //   Attaching user information in session after successfull user validation
      req.session.userEmail = email;
      var products = ProductModel.get();
      return res.render("products", {
        products,
        userEmail: req.session.userEmail,
      });
    } else {
      return res.render("login", { errorMessage: "Invalid credentials" });
    }
  }

  handleUserLogout(req, res) {
    // destroying session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        return res.redirect("/login");
      }
    });

    res.clearCookie("lastVisit");
  }
}
