const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');

router.get('/', controller.list);

router.get('/:page', controller.list);

module.exports = router;