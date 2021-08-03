// routeur pour enregistrement et connexion utilisateur
const userCtrl = require ('../controllers/user');
const express = require('express');
const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/update', userCtrl.updateAccount);
router.get('/deleteAccount', userCtrl.deleteAccount);

module.exports = router;
