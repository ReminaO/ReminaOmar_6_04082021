//import des modules
const express = require('express');
const router = express.Router();

// Middleware pour l'autentification
const auth = require('../middleware/auth');

// Middleware pour l'enregistrement des images
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

//Routes pour appeler les controllers sauces
router.post('/', auth, multer, saucesCtrl.createSauces);
router.post('/:id/like', auth, saucesCtrl.likeSauces);
router.put('/:id', auth, multer, saucesCtrl.modifySauces)
router.delete('/:id/', auth, saucesCtrl.deleteSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);


module.exports = router;//Export du fichier