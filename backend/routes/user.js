// routeur pour enregistrement et connexion utilisateur
const userCtrl = require ('../controllers/user');
const express = require('express');
const router = express.Router();
const password = require("../middleware/password"); // importe middleware password
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/infos/:id', auth, userCtrl.getUserInfos);
router.put('/profil/:id', auth, multer, password, userCtrl.updateProfile);
router.delete('/profil/:id', auth, userCtrl.deleteProfile);

module.exports = router;