/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

// module.exports = { upload, optimizeImage };
const multer = require('multer');
const sharp = require('sharp');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}_${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage }).single('image');

// eslint-disable-next-line consistent-return
const optimizeImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const { destination, filename } = req.file;
  const outputFilename = `${filename.split('.')[0]}.webp`;

  try {
    await sharp(req.file.path)
      .resize(206, 260)
      .webp({ quality: 70 })
      .toFile(`${destination}/${outputFilename}`);
  } catch (error) {
    return next(error);
  }

  req.file.filename = outputFilename;
  next();
};

module.exports = {
  upload,
  optimizeImage,
};

// const multer = require('multer');

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png',
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'images');
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_');
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, `${name + Date.now()}.${extension}`);
//   },
// });

// const storage2 = (req,res) => {
// const { buffer } = req.file;
// const name = file.originalname.split(' ').join('_');
// const extension = MIME_TYPES[file.mimetype];
// const nameFinal = `${name + Date.now()}.${extension}`;
// const ref = `${nameFinal}.webp`;
// await sharp(buffer)
//   .webp({ quality: 80 })
//   .toFile(`./images/${ref}`);
// }

// module.exports = multer({ storage }).single('image');

// const multer = require('multer');

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png',
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'images');
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_');
//     const extension = MIME_TYPES[file.mimetype];
//     // eslint-disable-next-line prefer-template
//     callback(null, name + Date.now() + '.' + extension);
//   },
// });
// module.exports = multer({ storage }).single('image');

// const multer = require('multer');
// const sharp = require('sharp');

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png',
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'images');
//   },
//   filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_');
//     const extension = MIME_TYPES[file.mimetype];
//     callback(null, `${name + Date.now()}.${extension}`);
//   },
// });

// const upload = multer({ storage }).single('image');

// // Middleware pour optimiser l'image avec Sharp
// const optimizeImage = (req, res, next) => {
//   if (!req.file) {
//     return next();
//   }

//   const { path } = req.file;

//   sharp(path)
//     .resize(260, 260) // Redimensionner l'image en 260x260 pixels
//     .webp() // Convertir l'image en format WebP
//     .toFile(path, (error, info) => {
//       if (error) {
//         return next(error);
//       }
//       next();
//     });
// };
