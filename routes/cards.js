const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  dislikeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', addLike);
router.delete('/:cardId/likes', dislikeLike);

module.exports = router;
