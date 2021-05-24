const userController = require('../controller/user.controller');
const {tokenValidator} = require('../utils/helper');
const router = require('express').Router();

router.post('/login', userController.login);

router.post('/register', userController.register);

router.get('/', tokenValidator, userController.findAll);

router.get('/:username', tokenValidator, userController.findOne);

router.put('/', tokenValidator, userController.update);

router.delete('/:username', tokenValidator, userController.delete);

module.exports = router;