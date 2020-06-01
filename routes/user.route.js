const express = require('express');
const multer  = require('multer');
const csurf = require('csurf');

const router = express.Router();
const controller = require('../controllers/user.controller');
const validate = require('../middleware/validate.middleware');

const upload = multer({ dest: './uploads/'});
var csrfProtection = csurf({ cookie: true });

router.get('/', controller.list);

router.get('/create', csrfProtection, controller.add);

router.post('/create', upload.single('avatar'), csrfProtection, validate.createUser, controller.create);

router.get('/edit/:id', csrfProtection, controller.edit);

router.post('/edit/:id', upload.single('avatar'), csrfProtection, validate.updateUser, controller.update);

router.get('/remove/:id', controller.remove);

router.get('/view/:id', controller.view);

module.exports = router;