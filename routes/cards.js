const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const authMiddleware = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  dislikeLike,
} = require('../controllers/cards');

const cardIdValidator = celebrate({
  params: Joi.object().schema({
    cardId: Joi.number().required(),
  }),
});

router.get('/', authMiddleware, getCards);
router.post('/', authMiddleware, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().uri().required(),
  }),
}), createCard);
router.delete('/:cardId', authMiddleware, cardIdValidator, deleteCard);
router.put('/:cardId/likes', authMiddleware, cardIdValidator, addLike);
router.delete('/:cardId/likes', authMiddleware, cardIdValidator, dislikeLike);

module.exports = router;
