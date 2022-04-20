// routeur pour enregistrement et connexion utilisateur
const userCtrl = require ('../controllers/user');
const express = require('express');
const router = express.Router();
const password = require("../middleware/password"); // importe middleware password
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/signup', password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/infos/:id', auth.token, userCtrl.getUserInfos);
router.get('/infos/:id', auth.token, userCtrl.getUsername);
router.get('/allUsers', auth.token, userCtrl.getAllUsers);
router.put('/addAdmin/:id', auth.token, auth.isMemberOrAdminUser, userCtrl.addAdmin);
router.put('/removeAdmin/:id', auth.token, auth.isMemberOrAdminUser, userCtrl.removeAdmin);
router.put('/updateProfile/:id', auth.token, auth.isMemberOrAdminUser, password, userCtrl.updateProfile);
router.put('/updateAvatar/:id', auth.token, auth.isMemberOrAdminUser, multer, userCtrl.updateAvatar);
router.delete('/deleteProfile/:id', auth.token, auth.isMemberOrAdminUser, userCtrl.deleteProfile);

module.exports = router;