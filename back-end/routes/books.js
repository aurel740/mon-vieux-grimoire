/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const auth = require('../middleware/auth');
const { upload, optimizeImage } = require('../middleware/multer-config');
const booksCtrl = require('../controllers/books');

const router = express.Router();

router.post('/', auth, upload, optimizeImage, booksCtrl.createBook);
router.get('/', booksCtrl.getAllBooks);
router.get('/bestrating', booksCtrl.bestRatings);
router.post('/:id/rating', auth, booksCtrl.createRatings);
router.put('/:id', auth, upload, optimizeImage, booksCtrl.modifyBooks);
router.delete('/:id', auth, booksCtrl.deleteBooks);
router.get('/:id', booksCtrl.getOneBooks);

module.exports = router;

// const express = require('express');
// const auth = require('../middleware/auth');
// const { upload, imageMiddleware } = require('../middleware/multer-config');
// const booksCtrl = require('../controllers/books');

// const router = express.Router();

// router.post('/', auth, upload.single('file'), imageMiddleware, booksCtrl.createBook);

// router.put('/:id', auth, upload.single('file'), imageMiddleware, booksCtrl.modifyBooks);

// router.delete('/:id', auth, booksCtrl.deleteBooks);

// router.get('/:id', booksCtrl.getOneBooks);

// router.get('/', booksCtrl.getAllBooks);

// module.exports = router;
