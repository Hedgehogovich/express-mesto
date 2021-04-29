const router = require('express').Router();
const {
  getUsers,
  findOneUser,
  createUser,
  editUser,
  editAvatar,
  login,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', findOneUser);
router.post('/signin', login);
router.post('/signup', createUser);
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatar);

module.exports = router;
