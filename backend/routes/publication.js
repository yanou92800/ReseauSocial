const publicationCtrl = require('../controllers/publication');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/createPublication', auth, multer, publicationCtrl.createPublication);
router.put('/updatePublication', auth, multer, publicationCtrl.updatePublication);
router.delete('/deletePublication', auth, publicationCtrl.deletePublication);

module.exports = router;