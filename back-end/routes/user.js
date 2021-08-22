//import des modules
const express = require('express');
const router = express.Router();

//import des controllers
const userCtrl = require('../controllers/user');

//Routes pour appeler les controllers user
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;//Export du fichier