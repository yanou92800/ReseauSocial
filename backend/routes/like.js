const likeCtrl = require('../controllers/like');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post("/:id/addLike", auth.params, likeCtrl.addLike);
router.delete("/:id/deleteLike", auth.params, likeCtrl.deleteLike);


module.exports = router;