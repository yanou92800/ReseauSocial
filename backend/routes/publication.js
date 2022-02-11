const publicationCtrl = require('../controllers/publication');
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post("/createPublication", auth.body, multer, publicationCtrl.createPublication);
router.get('/onePublication/:id', auth.body, publicationCtrl.getOnePublication);
router.get('/allPublications', auth.body, publicationCtrl.getAllPublications);
router.put("/updatePublication/:id", auth.body, multer, publicationCtrl.updatePublication);
router.delete("/deletePublication/:id", auth.body, publicationCtrl.deletePublication);

module.exports = router;