const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userValidate = require('../middleware/validate.middleware')

router.get('/cookie', function(req, res, next){
    res.cookie('nameAuthor' , 'Obito');
    res.send('Set cookie success');

    // console.log(req.cookies.nameAuthor);
});

router.get('/', userController.list);

router.get('/search', userController.search);

router.get('/create', userController.add);

router.post('/create', userValidate.createUser, userController.create);

router.get('/detail/:id', userController.view);

module.exports = router;