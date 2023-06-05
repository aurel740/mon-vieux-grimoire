/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
// Si utilisation de .env
// const dotenv = require('dotenv').config();

const mongoose = require('mongoose');

const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

mongoose.connect(
  'mongodb+srv://user2:67Fe0H4brf5MdPiw@monvieuxgrimoire.n2cyfqs.mongodb.net/api',
  // `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@monvieuxgrimoire.n2cyfqs.mongodb.net/api`
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
