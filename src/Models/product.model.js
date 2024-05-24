export default class ProductModel {
  constructor(_id, _name, _desc, _price, _imageURL) {
    this.id = _id;
    this.name = _name;
    this.desc = _desc;
    this.price = _price;
    this.imageURL = _imageURL;
  }

  static get() {
    return products;
  }

  static updateProduct(id, name, desc, price, imageURL) {
    const productIndex = products.findIndex((product) => product.id == id);
    if (productIndex !== -1) {
      products[productIndex] = new ProductModel(
        id,
        name,
        desc,
        price,
        imageURL
      );
    }
  }

  // static updateProduct(productObj) {
  //   const productIndex = products.findIndex(
  //     (product) => product.id == productObj.id
  //   );

  //   products[productIndex] = productObj;
  // }

  static deleteProduct(id) {
    const productIndex = products.findIndex((product) => product.id == id);
    console.log("deleteProduct productIndex", productIndex);
    if (productIndex != -1) {
      products.splice(productIndex, 1);
      return true;
    } else {
      return false;
    }
  }

  static add(name, desc, price, imageURL) {
    let newProduct = new ProductModel(
      products.length + 1,
      name,
      desc,
      price,
      imageURL
    );
    products.push(newProduct);
    console.log("after adding", products);
  }

  static getProductById(id) {
    const requiredProduct = products.find((product) => product.id == id);
    return requiredProduct;
  }
}

export var products = [
  new ProductModel(
    1,
    "Atomic Habits",
    "A supremely practical and useful book.",
    300,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg"
  ),

  new ProductModel(
    2,
    "Ikigai",
    "The Japanese secret to a long and happy life",
    340,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"
  ),

  new ProductModel(
    3,
    "Deep Work",
    "RULES FOR FOCUSED SUCCESS IN A DISTRACTED WORLD",
    280,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg"
  ),
];
