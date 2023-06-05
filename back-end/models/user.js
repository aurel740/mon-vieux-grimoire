/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// package de validation pour prévalider les informations avant
// de les enregistrer et améliore les messages d'erreur.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
