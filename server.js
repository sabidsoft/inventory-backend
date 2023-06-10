// modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");
const storeRoute = require("./routes/store.route");
const categoryRoute = require("./routes/category.route");
const supplierRoute = require("./routes/supplier.route");
const stockRoute = require("./routes/stock.route");
const userRoute = require("./routes/user.route");

// variables
const app = express();
const PORT = process.env.PORT || 8080;

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`Server is running`)
})

// routes
app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/stock", stockRoute);
app.use("/api/v1/user", userRoute);

// database connection
mongoose.connect(process.env.DATABASE)
    .then(() => { console.log(`Database connection is successful`) })

// server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})