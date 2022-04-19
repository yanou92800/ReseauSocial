const db = require('../DBConnect');
const cryptojs = require('crypto-js');
const bcrypt = require('bcrypt'); //package de hachage
const jwt = require('jsonwebtoken'); //package de sécurité de jetons (tokens) avec algo hmac
require('dotenv').config(); //variable d'environnement pour lire clé et valeur de .env

const sqlSignup = (email, username, password) => {
  return `INSERT INTO users  (email, username, password) VALUES ('${email}', '${username}', '${password}')`
};

const sqlLogin = (email) => {
  return `SELECT * FROM users WHERE email = '${email}'`
};

const sqlUpdateProfile = (email, username, password, id) => {
  return `UPDATE users SET email = '${email}', username = '${username}', password = '${password}' WHERE id= '${id}'`
};

const sqlAdmin = (isAdmin, id) => {
  return `UPDATE users SET isAdmin = '${isAdmin}' WHERE id = '${id}'`
};

const sqlUpdateAvatar = (avatar, id) => {
  return `UPDATE users SET avatar = "${avatar}" WHERE id = "${id}"` // tester la sous requete
};

const sqlDeleteProfile = (id) => {
  return `DELETE FROM users WHERE id = '${id}'`
};

const sqlGetUserInfos = (id) => {
  return `SELECT * FROM users WHERE id = '${id}'`
};

exports.getUserInfosQuery = sqlGetUserInfos;

const sqlGetUsername = (username) => {
  return `SELECT * FROM users WHERE username = '${username}'`
};

const sqlGetAllUsers = () => {
  return `SELECT username FROM users`
};

// fonction pour s'inscire
exports.signup = (req, res, next) => {

  bcrypt.hash(req.body.password, 10, function(err, hash) {

    if (err) throw err;

    const signup = sqlSignup (
      cryptojs.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString(),
      req.body.username,
      hash,
    );
    
    db.query(
      signup, 
      function(err) {
        if (err) {
          return res.status(401).json(err);
        };
        return res.json({ 
          message: 'Enregistrement confirmé!',
          username: req.body.username
        });
      }
    );
  })
};

//se connecter
exports.login = (req, res, next) => {
  
  const checkEmail = sqlLogin (
    cryptojs.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString()
  );
  
  db.query(
    checkEmail,
    (err, result) => {
      if (err) res.status(500).json({ error: "erreur serveur" });
      console.log(result)
      if (result.length == 0) {
        return res.status(401).json({ message: "Utilisateur non trouvé." });
      }
        
      const login = sqlLogin (
        cryptojs.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString()
      );
        
      console.log("Se connecter", login)
  
      db.query(
        login,
        req.body.email,
        (err, result) => {
          if (err) throw err;
          if (result.length == 0) {
            return res.status(401).json({ message: 'Veuillez entrer un mot de passe.' })
          }
          if (result) {
            bcrypt.compare(req.body.password, result[0].password)
            .then(valid => {
              if (!valid) {
                return res.status(401).json({ message: 'Mot de passe incorrect.' })
              };
              res.status(200).json({
                avatar: result[0].avatar,
                id: result[0].id,
                username: result[0].username,
                email: req.body.email,
                password: result[0].password,
                token: jwt.sign(
                  {userId: result[0].id},
                  process.env.TOKEN,
                  {expiresIn: '24h'},
                ),
                isAdmin: result[0].isAdmin
              });
            })
            .catch(error => res.status(500).json({ error }));
          }
        }
      )
    }
  )
}

exports.updateAvatar = (req, res, next) => {
  
  let attachment = null;
    if (req.file) {
      attachment = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    } 
    if (req.file == undefined) {
      res.status(400).json({ error: "Il n'y a aucun contenu à ajouter !" });
    }
    else {
      const updateAvatar = sqlUpdateAvatar(
        attachment,
        req.params.id
      );
      db.query(
        updateAvatar,
        function(error, result) {
            if (error) throw error;
            console.log(error);
            if (result) {
                // console.log(result)
            }
            res.status(201).json(result)
        }
      ) 
    }
}

exports.getUserInfos = (req, res, next) => {
  
  const getUserInfos = sqlGetUserInfos(
    req.params.id
  );

  //console.log(getUserInfos)
  
  db.query(
    getUserInfos,
    function(error, result) {
      if (error) throw error;
      if (result) {
        console.log(result)
        }
      res.status(200).json({
        message: 'Acces au profil',
        infos: {
          username: result[0].username,
          avatar: result[0].avatar,
          email: result[0].email,
          password: result[0].password,
          isAdmin: result[0].isAdmin,
          id: result[0].id
        }
      })
    }
  )
};

exports.getUsername = (req, res, next) => {
  
  const getUsername = sqlGetUsername(
    req.body.username
  );

  //console.log(getUserInfos)
  
  db.query(
    getUsername,
    function(error, result) {
      if (error) throw error;
      if (result) {
        console.log(result)
        }
      res.status(200).json({
        message: 'Acces au profil',
        infos: {
          username: result[0].username,
        }
      })
    }
  )
};

exports.updateProfile = (req, res, next) => {

  bcrypt.hash(req.body.password, 10, function(err, hash) {
    
    if (err) throw err;
    
    const updateProfile = sqlUpdateProfile(
      cryptojs.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString(),
      req.body.username,
      hash,
      req.params.id
    );
  
    console.log(updateProfile);
  
    db.query(
      updateProfile, 
      function(err) {
        if (err) {
          return res.status(401).json(err);
        };
        return res.json({ 
          message: 'Modification confirmé!',
          username: req.body.username
        });
      }
    );
  })
}

exports.deleteProfile = (req, res, next) => {

  const deleteProfile = sqlDeleteProfile(
      req.params.id,
  );

  db.query(
    deleteProfile,
    function(error, result) {
      if (error) throw error;
      if (result) {
        //console.log(result)
        }
      res.status(200).json({
        message: 'Compte supprimé',
      })
    }
  )
};

exports.addAdmin = (req, res, next) => {

  const addAdmin = sqlAdmin(
    req.body.isAdmin = 2,
    req.params.id
  );
  
  console.log("Author controller", addAdmin);
  
  db.query(
    addAdmin,
    function(error) {
      if (error) throw error;
    },
    //console.log(addAdmin)
  )
  res.status(201).json({ message: 'Modérateur ajouté' })
};

exports.removeAdmin = (req, res, next) => {

  const removeAdmin = sqlAdmin(
    req.body.isAdmin = 0,
    req.params.id
  );
  
  console.log("Author controller", removeAdmin);
  
  db.query(
    removeAdmin,
    function(error) {
      if (error) throw error;
    },
    //console.log(removeAdmin)
  )
  res.status(201).json({ message: 'Modérateur enlevé' })
};

exports.deleteProfile = (req, res, next) => {

  const deleteProfile = sqlDeleteProfile(
      req.params.id
  );

  db.query(
    deleteProfile,
    function(error, result) {
      if (error) throw error;
      if (result) {
        //console.log(result)
        }
      res.status(200).json({
        message: 'Compte supprimé',
      })
    }
  )
};

exports.getAllUsers = (req, res, next) => {
  
  const getAllUsers = sqlGetAllUsers();

  //console.log(getAllUsers)
  
  db.query(
    getAllUsers,
    function(error, result) {
      if (error) throw error;
      console.log(error);
      if (result) {
        //console.log(result)
        }
      res.status(200).json({
        message: 'Acces aux users',
        infos: {
          username: result
      }
      })
    }
  )
};