/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    // eslint-disable-next-line prefer-template
    callback(null, name + Date.now() + '.' + extension);
  },
});

module.exports = multer({ storage }).single('image');
