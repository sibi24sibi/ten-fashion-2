const express = require("express");
const upload = require("../config/multer.js");
const {
  createProduct,
  getProducts,
} = require("../controllers/productContrroller.js");

const router = express.Router();

// Define routes
router.post("/api/products", upload.single("image"), createProduct); // POST /api/products
router.get("/api/products", getProducts); // GET /api/products

module.exports = router;
