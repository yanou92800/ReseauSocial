const likeCtrl = require('../controllers/like');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/onePublication/:id/getAllLikes', auth.token, likeCtrl.getAllLikes);
router.post('/onePublication/:id/addLike', auth.token, likeCtrl.addLike);
router.delete('/deleteLike/:id', auth.token, likeCtrl.deleteLike);
router.get('/oneComment/:id/allLikes', auth.token, likeCtrl.getAllLikes);
router.post('/oneComment/:id/addLike', auth.token, likeCtrl.addLike);
router.delete("/oneComment/:id/deleteLike/:id", auth.token, likeCtrl.deleteLike);


module.exports = router;