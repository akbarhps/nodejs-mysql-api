const product = require('../controller/product.controller');
const {tokenValidator} = require('../utils/helper');
const router = require('express').Router();

router.get('/', tokenValidator, product.findAll);

router.get('/:id', tokenValidator, product.findById);

router.post('/', tokenValidator, product.create);

router.put('/:id', tokenValidator, product.update);

router.delete('/:id', tokenValidator, product.delete);

module.exports = router;