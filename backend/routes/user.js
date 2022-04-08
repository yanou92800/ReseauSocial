// routeur pour enregistrement et connexion utilisateur
const userCtrl = require ('../controllers/user');
const express = require('express');
const router = express.Router();
const password = require("../middleware/password"); // importe middleware password
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/infos/:id', auth.body, userCtrl.getUserInfos);
router.get('/allUsers', userCtrl.getAllUsers);
router.put('/addAdmin/:id', auth.admin, userCtrl.addAdmin);
router.put('/removeAdmin/:id', auth.body, userCtrl.removeAdmin);
router.put('/updateProfil/:id', auth.params, multer, password, userCtrl.updateProfile);
router.delete('/deleteProfil/:id', auth.body, userCtrl.deleteProfile);

module.exports = router;