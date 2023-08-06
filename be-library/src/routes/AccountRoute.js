const express = require('express');
const router = express.Router();

const authenticateJWT = require('../app/middleware/authenticateJWT');
const verifySignUp = require('../app/middleware/verifySignUp');
const UserController = require('../app/controller/AccountController');
const OrderController = require('../app/controller/OrderController');
const AdminController = require('../app/controller/AdminController');

router.post('/admin', AdminController.signup);

router.post('/signup',[
    verifySignUp.checkDuplicate
],UserController.createUser);
router.post('/signin', UserController.signin);
router.post('/logout', UserController.logout);
router.post('/pay', [authenticateJWT.authenUserJWT], OrderController.addBillUser);
router.post('/order/cancel', [authenticateJWT.authenUserJWT], OrderController.cancelOrder);
router.put('/update/password', [authenticateJWT.authenUserJWT], UserController.updatePassword);
router.put('/update/profile', [authenticateJWT.authenUserJWT], UserController.updateProfile);
router.delete('/delete', UserController.deleteAccount);

module.exports = router;