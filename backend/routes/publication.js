const publicationCtrl = require('../controllers/publication');
const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post("/createPublication", auth, multer, publicationCtrl.createPublication);
router.put("/update/:id", auth, multer, publicationCtrl.updatePublication);
router.delete("/delete/:id", auth, publicationCtrl.deletePublication);

module.exports = router;