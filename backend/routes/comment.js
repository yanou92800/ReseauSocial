const commentCtrl = require('../controllers/comment');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/onePublication/:id/createComment', auth.token, commentCtrl.createComment);
router.get('/oneComment/:id', auth.token, commentCtrl.getOneComment);
router.get('/onePublication/:id/allComments', auth.token, commentCtrl.getAllComments);
router.put('/updateComment/:id', auth.token, commentCtrl.updateComment);
router.delete('/deleteComment/:id', auth.token, commentCtrl.deleteComment);

module.exports = router;