// protége les routes sélectionnées et vérifie que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes

const jwt = require('jsonwebtoken'); // package création de token pour gérer l'authentification
require("dotenv").config();

module.exports = (req, res, next) => { // exportation identification utilisateur comparaison pour modification/suppression
  try {
    const token = req.headers.authorization.split(' ')[1]; // extraction du token du header avec fonction split pour récupérer tout après l'espace dans le header
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // verify pour décoder le token
    const userId = parseInt(decodedToken.userToken); // extraction ID utilisateur du token  
    // console.log(decodedToken.userToken);    
    if (req.params.id && parseInt(req.params.id) !== userId) { // comparaison ID utilisateur à celui du token
      throw 'Invalid user ID';
    } else {
      next(); // si ok on passe à l'étape suivante
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!') // si différent erreur
    });
  }
};