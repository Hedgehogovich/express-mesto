const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const authMiddleware = require('../middlewares/auth');
const {
  getUsers,
  findOneUser,
  findCurrentUser,
  editUser,
  editAvatar,
} = require('../controllers/users');

router.get('/', authMiddleware, getUsers);
router.get('/:userId', authMiddleware, celebrate({
  params: Joi.object().schema({
    userId: Joi.number().required(),
  }),
}), findOneUser);
router.get('/me', authMiddleware, findCurrentUser);
router.patch('/me', authMiddleware, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), editUser);
router.patch('/me/avatar', authMiddleware, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
}), editAvatar);

module.exports = router;
