const router = require('express').Router();

const { addComment, getComments, deletComment } = require('../contollers/comment');

router.get('/', getComments);
router.post('/add', addComment);
router.delete('/:id', deletComment);

module.exports = router;