const router = require('express').Router();
const {
  getUsers,
  findOneUser,
  createUser,
  editUser,
  editAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', findOneUser);
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatar);

module.exports = router;
