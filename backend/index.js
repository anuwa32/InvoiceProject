require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const productRoutes = require("./routes/products");
const invoiceRoutes = require("./routes/invoice");
const searchRoutes = require("./routes/search");

//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/products", productRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/search", searchRoutes);

const port = process.env.PORT || 8085;
app.listen(port, console.log(`Listening on port ${port}...`));
