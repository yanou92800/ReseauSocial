const likeCtrl = require('../controllers/like');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/onePublication/:id/getAllLikes', auth.body, likeCtrl.getAllLikes);
router.post('/onePublication/:id/addLike', auth.body, likeCtrl.addLike);
router.delete('/deleteLike/:id', auth.body, likeCtrl.deleteLike);
router.get('/oneComment/:id/allLikes', auth.body, likeCtrl.getAllLikes);
router.post('/oneComment/:id/addLike', auth.body, likeCtrl.addLike);
router.delete("/oneComment/:id/deleteLike/:id", auth.body, likeCtrl.deleteLike);


module.exports = router;