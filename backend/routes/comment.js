const commentCtrl = require('../controllers/comment');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/onePublication/:id/createComment', auth.body, commentCtrl.createComment);
router.get('/oneComment/:id', auth.body, commentCtrl.getOneComment);
router.put('/:id/:id/', commentCtrl.updateComment);
router.delete('/onePublication/:id/deleteComment/:id', auth.body, commentCtrl.deleteComment);

module.exports = router;