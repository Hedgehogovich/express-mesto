const router = require('express').Router();
const {
  getUsers,
  findOneUser,
  findCurrentUser,
  editUser,
  editAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', findOneUser);
router.get('/me', findCurrentUser);
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatar);

module.exports = router;
