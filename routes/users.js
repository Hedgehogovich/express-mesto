const router = require('express').Router();
const {
  getUsers,
  findOneUser,
  editUser,
  editAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', findOneUser);
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatar);

module.exports = router;
