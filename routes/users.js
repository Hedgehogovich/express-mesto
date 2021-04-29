const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const {
  getUsers,
  findOneUser,
  findCurrentUser,
  editUser,
  editAvatar,
} = require('../controllers/users');

router.get('/', authMiddleware, getUsers);
router.get('/:userId', authMiddleware, findOneUser);
router.get('/me', authMiddleware, findCurrentUser);
router.patch('/me', authMiddleware, editUser);
router.patch('/me/avatar', authMiddleware, editAvatar);

module.exports = router;
