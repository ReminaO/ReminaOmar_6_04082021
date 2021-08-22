//Import des modules
const fs = require('fs');
const Sauce = require('../models/ModelsSauce');

// Controllers pour créer une sauce
exports.createSauces = (req, res, next) => {
  // récupère et transforme chaine en objet js
  const sauceObject = JSON.parse(req.body.sauce);
  // Efface L'id prédéfini pour en créer une nouvelle
    delete sauceObject._id;
    const sauce = new Sauce ({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersDisliked: [],
      usersLiked: []
    });
  // sauvegarde la nouvelle sauce dans la bas de données
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
};
  
// Controllers pour liker ou disliker une sauce
exports.likeSauces = (req, res, next) => {

  const choice = {
    LIKE: 1,
    DISLIKE: -1,
    RESET: 0,
  }
  const sauceId = req.params.id;
  const { userId, like: userChoice } = req.body;

  if (!(Number.isInteger(userChoice) && (userChoice >= -1 && userChoice <= 1))) {
    console.log('error ');
    return null
  }

  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      // Condition si la sauce n'est plus aimée ou n'est plus dislikée
      if (userChoice === choice.RESET) {
        console.log('reset all likes ')
        removeUser(userId, sauce.usersLiked);
        removeUser(userId, sauce.usersDisliked);
      }
    // Condition si la sauce est likée
      if (userChoice === choice.LIKE) {
        console.log('user liked the sauce ');
        if (sauce.usersLiked.find(u => u === userId)) {
          console.log('user already voted ‍');
          return 'you have déjà voté !';
        }
        sauce['usersLiked'].push(userId);
        sauce['likes'] = sauce['usersLiked'].length;

        if (sauce.usersDisliked.find(u => u === userId)) {
          removeUser(userId, sauce.userDislikes);
        }
      }
      // Condition si la sauce est dislikée
      if (userChoice === choice.DISLIKE) {
        console.log('user hate the sauce ');
        if (sauce.usersDisliked.find(u => u === userId)) {
          console.log('user already voted ‍');
          return 'you have déjà voté !';
        }
        sauce['usersDisliked'].push(userId);
        sauce['dislikes'] = sauce['usersDisliked'].length;

        if (sauce.usersLiked.find(u => u === userId)) {
          removeUser(userId, sauce.usersLiked);
        }
      }

      sauce.likes = sauce.usersLiked.length;
      sauce.dislikes = sauce.usersDisliked.length;

      //console.log(sauce)
      const { usersLiked, usersDisliked, likes, dislikes } = sauce;
      const fields = {
        usersLiked, usersDisliked, likes, dislikes
      }

      // Met a jour la base de données avec le nouveau statut
      Sauce.findByIdAndUpdate(sauceId, fields, { new: true })
        .then(sauceLike => {
          res.status(200).json({ message: 'Statut mis a jour !', sauceLike })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
}

const removeUser = (userId, likesTab) => {
  const index = likesTab.indexOf(userId);
  if (index > -1) {
    likesTab.splice(index, 1);
  }

  return likesTab;
}  



// Controllers pour modifier une sauce
exports.modifySauces = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
  // Met a jour la base de données avec les nouveaux éléments 
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Controllers por effacer une sauce grâce a l'ID
exports.deleteSauces = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
    
};

// Controllers pour afficher une sauce grâce a l'ID
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Controllers pour afficher toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(400).json({ error }));
}

