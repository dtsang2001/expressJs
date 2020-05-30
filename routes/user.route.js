const express = require('express');
const multer  = require('multer');
const csurf = require('csurf');

const router = express.Router();
const controller = require('../controllers/user.controller');
const validate = require('../middleware/validate.middleware');

const upload = multer({ dest: './public/uploads/'});
var csrfProtection = csurf({ cookie: true });

router.get('/', controller.list);

router.get('/create', csrfProtection, controller.add);

router.post('/create', upload.single('avatar'), validate.createUser, controller.create);

router.get('/detail/:id', controller.view);

module.exports = router;