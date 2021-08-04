// routeur pour enregistrement et connexion utilisateur
const userCtrl = require ('../controllers/user');
const express = require('express');
const router = express.Router();
const password = require("../middleware/password"); // importe middleware password

router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/updateAccount', userCtrl.updateAccount);
router.delete('/deleteAccount', userCtrl.deleteAccount);

module.exports = router;