
const express = require('express');
const router = express.Router();

const controller = require('../controllers/cart.controller');

router.get('/', controller.view);

router.get('/add/:id', controller.add);

module.exports = router;