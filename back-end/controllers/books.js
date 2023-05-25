/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const fs = require('fs');
const Books = require('../models/books');

// exports.createBook = (req, res, next) => {
//   const bookObject = JSON.parse(req.body.book);
//   delete req.body.userId;
//   const book = new Books({
//     userId: '3',
//     title: bookObject.title,
//     author: 'je fonctionne jamais',
//     imageUrl: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg',
//     year: 1356468764552,
//     genre: 'fantome',
//     ratings: [{
//       userId: '3',
//       grade: 1,
//     }],
//     averageRatings: 1,
//   });
//   book.save()
//     .then(() => { res.status(201).json(book); })
//     .catch((error) => { res.status(400).json({ error }); });
// };

exports.createBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject.userId;
  const book = new Books({
    ...bookObject,
    id: bookObject._id,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  book.save()
    .then(() => { res.status(201).json(book); })
    .catch((error) => { res.status(400).json({ error }); });
};

exports.createRatings = (req, res) => {
  const grade = JSON.parse(req.body.rating);
  Books.findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: 'Livre non trouvé.' });
      }

      // Vérifier si l'utilisateur a déjà noté le livre
      const existingRating = book.ratings.find((rating) => rating.userId === req.auth.userId);
      if (existingRating) {
        return res.status(400).json({ error: 'Vous avez déjà noté ce livre.' });
      }

      // Ajouter la nouvelle note à la liste des ratings du livre
      book.ratings.push({ userId: req.auth.userId, grade });

      // Calculer la note moyenne
      const totalRatings = book.ratings.length;
      let sumOfRatings = 0;

      book.ratings.forEach((rating) => {
        sumOfRatings += rating.grade;
      });

      const averageRating = sumOfRatings / totalRatings;

      // Mettre à jour la note moyenne du livre
      // eslint-disable-next-line no-param-reassign
      book.averageRating = averageRating;

      book.save()
        .then(() => res.status(200).json({
          userId: req.auth.userId, grade, averageRating: book.averageRating,
        }))
        .catch((error) => res.status(500).json({ grade }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// exports.createRatings = (req, res) => {
//   const bookO = req.body;
//   const ratings = new Books({
//     ratings: [{
//       userId: bookO.userId,
//       grade: bookO.rating,
//     }],
//   });
//   console.log(`note livre est ${ratings}`);
//   Books.findById(req.params.id)
//     .then(() => {
//       console.log(bookO);
//     })
//     .catch((err) => res.status(500).json({ ratings }));
// };

// _____________________________________________________________
exports.bestRatings = (req, res) => {
  Books.find()
    .then((books) => {
      books.sort((a, b) => b.averageRating - a.averageRating);
      const top3Books = books.slice(0, 3);
      res.status(200).json(top3Books);
      // console.log(`bestRatings est ${top3Books}`);
    })
    .catch((error) => res.status(400).json({ error }));
};
// exports.createBook = (req, res) => {
//   console.log('bookObject');
//   return res.send('<script>console.log(Hello world!)</script>');
// };

exports.modifyBooks = (req, res) => {
  Books.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteBooks = (req, res) => {
  Books.findOne({ _id: req.params.id })
    .then((books) => {
      if (books.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = books.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Books.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Objet supprimé !' }); })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOneBooks = (req, res) => {
  Books.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllBooks = (req, res) => {
  Books.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};
