const commentCtrl = require('../controllers/comment');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/onePublication/:id/createComment', auth.body, commentCtrl.createComment);
router.get('/oneComment/:id', auth.body, commentCtrl.getOneComment);
router.get('/onePublication/:id/allComments', auth.body, commentCtrl.getAllComments);
router.put('/updateComment/:id', auth.body, commentCtrl.updateComment);
router.delete('/deleteComment/:id', auth.body, commentCtrl.deleteComment);

module.exports = router;