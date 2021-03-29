require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

app.use(express.json());

const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

/**
 * Error handler middleware
 * all error forwarded to this function
 */
app.use((err, _req, res, _next) => {
    console.error(err);
    const statusCode = err.status || err.statusCode || 500;
    res.status(statusCode).json({message: err.message});
});

app.listen(PORT, () => console.log("Online"));