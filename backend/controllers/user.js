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

const sqlUpdateAccount = (email, username, password) => {
  return `UPDATE users SET email = '${email}', username = '${username}', password = '${password}' WHERE email= '${email}'`
};

const sqlDeleteAccount = (email) => {
  return `DELETE FROM users WHERE email = '${email}'`
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

      console.log(signup)

       db.query(
         signup, 
         function (err) {
           if (err) throw err;
        });

      res.status(201).json({ message: 'Enregistrement confirmée' })
    });
};

//se connecter
exports.login = (req, res, next) => {

  const login = sqlLogin (
      cryptojs.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString()
  );
  
  console.log(login)
  
  db.query(
      login,
      req.body.email,
      (err, result) => {
          if (err) throw err;
          if (!req.body.password) {
              return res.status(401).json({ message: 'Veuillez entrer un mot de passe.' })
          }
          bcrypt.compare(req.body.password, result[0].password)
          .then(valid => {
              if (!valid) {
                  return res.status(401).json({ message: 'Mot de passe incorrect.' })
              };
              res.status(200).json({
                userId: result[0].id,
                username: result[0].username,
                email: result[0].email,
                token: jwt.sign(
                    {userToken: result[0].id},
                    process.env.TOKEN,
                    {expiresIn: '24h'},
                    )
                  });
                })
                .catch(error => res.status(500).json({ error }));
              })
            }

exports.updateAccount = (req, res, next) => {
  const updateAccount = sqlUpdateAccount(
      req.body.email,
      req.body.username,
      req.body.password
  );
  
  console.log(updateAccount);
  
  db.query(
          updateAccount,
          function(error) {
              if (error) throw error;
          },
          console.log(updateAccount)
      )
    }

exports.deleteAccount = (req, res, next) => {

  const deleteAccount = sqlDeleteAccount(
      req.body.email
  );

  db.query(
      deleteAccount,
          function(error) {
              if (error) throw error;
          }
      )

      res.status(201).json({ message: 'Compte supprimé' })
}