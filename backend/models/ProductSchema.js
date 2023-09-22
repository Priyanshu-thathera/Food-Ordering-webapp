const mongoose = require("mongoose");

////////////////////////// for new product ///////////////

const productSchmea = new mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
  });
  
  const productModel = mongoose.model("product", productSchmea);

  module.exports = productModel