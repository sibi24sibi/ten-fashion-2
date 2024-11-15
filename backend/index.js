const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const productRoutes = require("./routes/productRoutes.js");

// Load environment variables
dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 8000;
const CONNECTION_URL = process.env.CONNECTION_URL;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB(CONNECTION_URL);

// Routes
app.use("/", productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
