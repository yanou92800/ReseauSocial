const likeCtrl = require('../controllers/like');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post("/:id/addLike", auth, likeCtrl.addLike);
router.delete("/:id/deleteLike", auth, likeCtrl.deleteLike);


module.exports = router;