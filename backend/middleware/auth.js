// protége les routes sélectionnées et vérifie que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes

const jwt = require("jsonwebtoken"); // package création de token pour gérer l'authentification
require("dotenv").config();
const { getUserInfosQuery } = require("../controllers/user");
const { getOnePublicationQuery } = require("../controllers/publication");
const { getOneCommentQuery } = require("../controllers/comment");
const db = require("../DBConnect");

exports.isMemberOrAdminPublication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // extraction du token du header avec fonction split pour récupérer tout après l'espace dans le header
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // verify pour décoder le token
    const getUserInfos = getUserInfosQuery(decodedToken.userId);
    db.query(getUserInfos, function (error, result) {
      if (error) throw error;
      if (result[0].isAdmin) {
        return next();
      }
      const getOnePublication = getOnePublicationQuery(req.params.id);
      db.query(getOnePublication, function (error, result) {
        if (result[0].userId != decodedToken.userId) {
          res.status(401).json({
            error: new Error("Invalid request!"), // si différent erreur
          });
        }
        else {
          next()
        }
      });
    });
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"), // si différent erreur
    });
  }
};

exports.isMemberOrAdminComment = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // extraction du token du header avec fonction split pour récupérer tout après l'espace dans le header
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // verify pour décoder le token
    const getUserInfos = getUserInfosQuery(decodedToken.userId);
    db.query(getUserInfos, function (error, result) {
      if (error) throw error;
      if (result[0].isAdmin) {
        return next();
      }
      const getOneComment = getOneCommentQuery(req.params.id);
      db.query(getOneComment, function (error, result) {
        if (result[0].userId != decodedToken.userId) {
          res.status(401).json({
            error: new Error("Invalid request!"), // si différent erreur
          });
        }
        else {
          next()
        }
      });
    });
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"), // si différent erreur
    });
  }
};

exports.isMemberOrAdminUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // extraction du token du header avec fonction split pour récupérer tout après l'espace dans le header
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`); // verify pour décoder le token
    const getUserInfos = getUserInfosQuery(decodedToken.userId);
    db.query(getUserInfos, function (error, result) {
      console.log('USER', result)
      if (error) throw error;
      if (req.params.id && parseInt(req.params.id) == decodedToken.userId) {
        return next();
      }
      if (result[0].isAdmin == 1) {
        return next()
      }
    });
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"), // si différent erreur
    });
  }
};

exports.token = (req, res, next) => {
  // exportation identification utilisateur comparaison pour modification/suppression
  try {
    console.log("AUTHOR 2", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1]; // extraction du token du header avec fonction split pour récupérer tout après l'espace dans le header
    const decodedToken = jwt.verify(token, `${process.env.TOKEN}`);
    console.log("DECODED", decodedToken); // verify pour décoder le token
    const userId = parseInt(decodedToken.userId); // extraction ID utilisateur du token
    console.log(
      "TOKEN",
      userId,
      req.body.userId,
      decodedToken.userId
    );
    if (req.body.userId && parseInt(req.body.userId) !== userId) {
      // comparaison ID utilisateur à celui du token
      throw "Invalid user ID";
    } else {
      next(); // si ok on passe à l'étape suivante
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"), // si différent erreur
    });
  }
};