const publicationCtrl = require('../controllers/publication');
const router = express.Router();
const express = require('express');

router.post('/createPublication', publicationCtrl.createPublication);
router.post('/updatePublication', publicationCtrl.updatePublication);
router.get('/realPublication', publicationCtrl.realPublication);
router.delete('/deletePublication', publicationCtrl.deletePublication);

module.exports = router;