/* eslint-disable linebreak-style */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const booksSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [
      {
        userId: { type: String, required: true },
        grade: { type: Number, required: true },
      },
    ],
    averageRating: { type: Number },
  },
);

// Ajouter le champ virtuel 'id' basé sur '_id'
booksSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Conversion de '_id' en 'id' lors de la conversion en JSON
booksSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('books', booksSchema);
