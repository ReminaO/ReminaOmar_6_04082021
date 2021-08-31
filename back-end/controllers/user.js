const bcrypt = require('bcrypt'); // import Bcrypt module
const User = require('../models/User'); // import modèle user
const jwt = require('jsonwebtoken'); // import jsonwebtoken module
const CryptoJS = require("crypto-js"); // import crypto tool

// Controllers pour créer un compte
exports.signup = (req, res, next) => {
    //Hachage du mot de passe
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
    const user = new User({
        email: CryptoJS.SHA256(req.body.email), //cryptage de l'adresse mail avec la fonction crypto
        password: hash
    });
    
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
        .catch(error => res.status(500).json({ error }));
    
};

// Controllers pour se connecter au site
exports.login = (req, res, next) => {
    User.findOne({ email: CryptoJS.SHA256(req.body.email).toString() }) // appel de l'adresse mail crypté et conversion de l'objet en string
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) // comparaison du mot de passe enregistré avec le mot de passe saisi
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.JWT_SECRET,
                            { expiresIn: process.env.JWT_EXPIRES_IN },
                        )
                    })
                    .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        });
}
