const product = require('../controller/product.controller');
const express = require('express');
const router = express.Router();

router.get('/', product.findAll);

router.get('/:id', product.findById);

router.post('/', product.create);

router.put('/:id', product.update);

router.delete('/:id', product.delete);

module.exports = router;