// import des différents modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//Import des routes
const saucesRoutes = require('../back-end/routes/sauces');
const userRoutes = require('../back-end/routes/user');

//Connection a la base de données MongoDB
mongoose.connect('mongodb+srv://remina:Nivea29@piiquante.9wpyf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//Mise en place des headers pour autoriser la communication entre nos deux serveurs front et back
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

//Définition du chemin contenant les images
app.use('/images', express.static(path.join(__dirname, 'images')));

//Définition du chemin des routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
  
module.exports = app; //Export du fichier