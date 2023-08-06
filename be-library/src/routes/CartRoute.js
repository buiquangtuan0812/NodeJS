const express = require('express');
const router = express.Router();

const CartController = require('../app/controller/CartController');
const authenticateJWT = require('../app/middleware/authenticateJWT');

router.get('/', [authenticateJWT.authenUserJWT], CartController.getCarts);
router.post('/add', [authenticateJWT.authenUserJWT],CartController.addNewCart);
router.post('/delete', [authenticateJWT.authenUserJWT],CartController.deleteCart);

module.exports = router;