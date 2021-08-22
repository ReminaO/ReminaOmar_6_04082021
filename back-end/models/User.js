//import des modules
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Définition du modèle user
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); //Vérification de la création d'un email unique

module.exports = mongoose.model('User', userSchema);//Export du modèle