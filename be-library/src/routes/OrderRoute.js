const express = require('express');
const router = express.Router();

const OrderController = require('../app/controller/OrderController');
const auth = require('../app/middleware/authenticateJWT');

router.get('/', [auth.authenUserJWT], OrderController.getOrder);

module.exports = router;