const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: String,
    brand: String,
    category: String,
    thumbnail: String,
    images: [String],
    status: Number,
    position: Number,
    delete: { type: Boolean, default: false },
});

const Product = mongoose.model("Products", productSchema, "products");
module.exports = Product;
