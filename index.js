require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

app.use(express.json());

const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');

app.use('/products', productsRoute);
app.use('/users', usersRoute);

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