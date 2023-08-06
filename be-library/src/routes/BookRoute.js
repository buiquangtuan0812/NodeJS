const express = require('express');
const router = express.Router();
const BookController = require('../app/controller/BookController');

router.get('/contemplation', BookController.getContemplationBooks);
router.get('/communicate', BookController.getCommunicateBooks);
router.get('/self-growth', BookController.getSelfGrowthBooks);
router.get('/psychology', BookController.getBooksPsychology);
router.get('/literature', BookController.getLiteratureBooks);
router.get('/life-skill', BookController.getLifeSkillBooks);
router.post('/generate/code', BookController.generateCode);
router.get('/get-by-type', BookController.getBooksByType);
router.get('/domestic', BookController.getBookDomestic);
router.get('/economy', BookController.getEconomyBooks);
router.get('/history', BookController.getHistoryBooks);
router.get('/author', BookController.getBookByAuthor);
router.get('/foreign', BookController.getBookForeign);
router.get('/detail', BookController.getContentBook);
router.get('/search', BookController.findBook);
router.get('/by', BookController.getBookById);
router.get('/',  BookController.getBooks);

module.exports = router;