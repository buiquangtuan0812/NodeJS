const express = require('express');
const router = express.Router();

const AdminController = require('../app/controller/AdminController');
const AccountController = require('../app/controller/AccountController');
const BookController = require('../app/controller/BookController');
const auth = require('../app/middleware/authenticateJWT');

router.get('/manage/book-list/seacrh', AdminController.searchBook);
router.get('/manage/book-details',[auth.authenticateJWT], AdminController.getBookDetails);
router.post('/signup', AdminController.signup);

// Solves with account user
router.delete('/delete-user', AccountController.deleteAccount);


// Solve with book
router.post('/create-book',  [auth.authenticateJWT],BookController.createBook);
router.put('/update-book', [auth.authenticateJWT], BookController.updateBook);
router.post('/delete-book', [auth.authenticateJWT],BookController.deleteBook);
module.exports = router;
