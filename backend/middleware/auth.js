// protége les routes sélectionnées et vérifie que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes

const jwt = require('jsonwebtoken'); // package création de token pour gérer l'authentification
require("dotenv").config();

exports.params = (req, res, next) => { // exportation identification utilisateur comparaison pour modification/suppression
  try {
    console.log("AUTHOR", req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]; // extraction du token du header avec fonction split pour récupérer tout après l'espace dans le header
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // verify pour décoder le token
    const userId = parseInt(decodedToken.userToken); // extraction ID utilisateur du token  
    console.log("TOKEN params", req.params.id, userId, decodedToken.userToken);    
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

exports.body = (req, res, next) => { // exportation identification utilisateur comparaison pour modification/suppression
  try {
    console.log("AUTHOR 2", req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]; // extraction du token du header avec fonction split pour récupérer tout après l'espace dans le header
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // verify pour décoder le token
    const userId = parseInt(decodedToken.userToken); // extraction ID utilisateur du token 
    console.log("TOKEN Body 2", userId, req.body.userId, decodedToken.userToken); 
    if (req.body.userId && parseInt(req.body.userId) !== userId) { // comparaison ID utilisateur à celui du token
      throw 'Invalid user ID';
    } 
    else {
      next(); // si ok on passe à l'étape suivante
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!') // si différent erreur
    });
  }
};

exports.admin = (req, res, next) => { // exportation identification utilisateur comparaison pour modification/suppression
  try {
    console.log("AUTHOR 3", req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]; // extraction du token du header avec fonction split pour récupérer tout après l'espace dans le header
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // verify pour décoder le token
    const userId = parseInt(decodedToken.userToken); // extraction ID utilisateur du token 
    console.log("TOKEN Body 3", userId, req.body.userId, decodedToken.userToken); 
    if (req.body.userId && parseInt(req.body.userId) !== userId) { // comparaison ID utilisateur à celui du token
      throw 'Invalid user ID';
    } 
    if (req.params.id == userId) {
      return res.status(401).json({ message: "'Vous n'êtes pas autorisé à vous rajouter admin'" })
    }
    else {
      next(); // si ok on passe à l'étape suivante
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!') // si différent erreur
    });
  }
};