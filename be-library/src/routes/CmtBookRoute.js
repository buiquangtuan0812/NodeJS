const express = require('express');
const router = express.Router();
const BookController = require('../app/controller/BookController');
const CommentBookController = require('../app/controller/CommentController');
const auth = require('../app/middleware/authenticateJWT');

router.get('/', BookController.getComments);
router.get('/by', CommentBookController.getUser);
router.post('/create', [auth.authenUserJWT], CommentBookController.createComment);
router.post('/delete', CommentBookController.deleteComment);
router.post('/update', CommentBookController.updateComment);
router.post('/like', [auth.authenUserJWT], CommentBookController.solveLikeComment);
router.post('/unlike', [auth.authenUserJWT], CommentBookController.solveDislike);
module.exports = router;