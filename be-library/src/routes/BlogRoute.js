const express = require('express');
const router = express.Router();

const BlogController = require('../app/controller/BlogController');
const auth = require('../app/middleware/authenticateJWT');

router.get('/', BlogController.getBlogs);
router.post('/create', BlogController.createBlog);
router.get('/details',[auth.authenUserJWT], BlogController.getContentBlog);
router.post('/like', [auth.authenUserJWT],BlogController.solveLike);
router.post('/dislike',[auth.authenUserJWT], BlogController.solveDislike);

module.exports = router;