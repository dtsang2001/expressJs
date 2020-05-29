const express = require('express');
const multer  = require('multer')

const router = express.Router();
const userController = require('../controllers/user.controller');
const userValidate = require('../middleware/validate.middleware');
const upload = multer({ dest: './public/uploads/' })

router.get('/', userController.list);

router.get('/create', userController.add);

router.post('/create', upload.single('avatar'), userValidate.createUser, userController.create);

router.get('/detail/:id', userController.view);

module.exports = router;