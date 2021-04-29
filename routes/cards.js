const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  dislikeLike,
} = require('../controllers/cards');

router.get('/', authMiddleware, getCards);
router.post('/', authMiddleware, createCard);
router.delete('/:cardId', authMiddleware, deleteCard);
router.put('/:cardId/likes', authMiddleware, addLike);
router.delete('/:cardId/likes', authMiddleware, dislikeLike);

module.exports = router;
