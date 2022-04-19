const publicationCtrl = require('../controllers/publication');
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post("/createPublication", auth.token, multer, publicationCtrl.createPublication);
router.get('/onePublication/:id', auth.token, publicationCtrl.getOnePublication);
router.get('/allPublications', auth.token, publicationCtrl.getAllPublications);
router.put("/updatePublication/:id", auth.token, multer, publicationCtrl.updatePublication);
router.delete("/deletePublication/:id", auth.token, auth.isMemberOrAdminPublication, publicationCtrl.deletePublication);

module.exports = router;