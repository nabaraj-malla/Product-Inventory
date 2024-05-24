import ProductModel, { products } from "../Models/product.model.js";

export default class ProductController {
  getProducts(req, res) {
    var products = ProductModel.get();
    return res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  getAddForm(req, res) {
    return res.render("new-product", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }

  addNewProduct(req, res) {
    const { name, desc, price } = req.body;
    // const imageURL = "images/" + req.file.filename;
    // ProductModel.add(name, desc, price, imageURL);
    let { filename } = req.file;
    console.log("filename", filename);
    filename = "images/" + filename;
    ProductModel.add(name, desc, price, filename);
    var products = ProductModel.get();
    return res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  getUpdateProductView(req, res, next) {
    // 1. if product exist return view
    const id = req.params.iD;
    const productFound = ProductModel.getProductById(id);
    if (productFound) {
      return res.render("update-product", {
        product: productFound,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    } else {
      return res.send("product not found");
    }
  }

  handleProductUpdate(req, res) {
    const { id, name, price, desc, currentImageURL } = req.body;
    var imageURL;
    if (req.file) {
      // New file uploaded
      imageURL = "images/" + req.file.filename;
    } else {
      // No new file uploaded, use the existing image URL
      imageURL = currentImageURL;
    }
    ProductModel.updateProduct(id, name, desc, price, imageURL);
    return res.redirect("/");
  }

  handleDeleteProduct(req, res) {
    var id = req.params.iD;
    // id = Number(id);
    console.log("Id to delete", id);
    const result = ProductModel.deleteProduct(id);
    if (result) {
      return res.redirect("/");
    } else {
      return res.status(401).send("Invalid Id");
    }
  }
}
