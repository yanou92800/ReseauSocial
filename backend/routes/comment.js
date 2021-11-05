const commentCtrl = require('../controllers/comment');
const express = require('express');
const router = express.Router();

router.post('/:id/', commentCtrl.createComment);
router.put('/:id/:id/', commentCtrl.updateComment);
router.delete('/:id/id/', commentCtrl.deleteComment);

module.exports = router;