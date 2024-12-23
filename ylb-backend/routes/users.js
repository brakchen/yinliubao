const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register',    userController.register);
router.post('/login',       userController.login);
router.get('/profile',     userController.getProfile);
router.get('/info',     userController.getProfile);
router.get('/codes',     userController.getCodes);

module.exports = router;