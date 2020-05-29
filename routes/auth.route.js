const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware.requireAuth, controller.view);

router.get('/login', controller.login);

router.post('/login', controller.loginPost);

router.get('/logout', controller.logout);

module.exports = router;