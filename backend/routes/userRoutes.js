const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth-middleware');


router.post('/signup', userController.addNewUser);
router.post('/login', userController.loginUser);
router.get('/logout',authMiddleware, userController.logoutUser);
router.put('/theme', authMiddleware, userController.updateTheme);


module.exports = router;