const Product = require("../models/product");

// Create a new product
const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    const products = Array.isArray(req.body) ? req.body : [req.body];

    const productsWithImage = products.map((product) => ({
      ...product,
      images: req.file.path,
    }));

    const createdProducts = await Product.insertMany(productsWithImage);

    res.status(201).json(createdProducts);
  } catch (error) {
    console.error(error); // Log the error to understand the issue
    res.status(500).json({ message: "Error saving product", error });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// controllers/uploadController.js
const uploadImage = (req, res) => {
  if (req.file) {
    res.status(200).json({
      message: "Image uploaded successfully",
      url: req.file.path,
    });
  } else {
    res.status(400).json({ error: "Image upload failed" });
  }
};

module.exports = {};

module.exports = { createProduct, getProducts, uploadImage };
