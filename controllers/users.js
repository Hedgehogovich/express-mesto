const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BCRYPT_SALT_ROUNDS } = require('../utils/constants');
const { BAD_REQUEST } = require('../utils/errorCodes');
const { handleCRUDError } = require('../utils/handleCRUDError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleCRUDError(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!password || !password.length) {
    res.status(BAD_REQUEST).send({ message: 'Не указан пароль' });
    return;
  }

  if (password.length < 8) {
    res.status(BAD_REQUEST).send({ message: 'Пароль должен быть длиннее 8 символов' });
    return;
  }

  if (!email || !email.length) {
    res.status(BAD_REQUEST).send({ message: 'Не указан Email' });
    return;
  }

  bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => handleCRUDError(err, res));
};

module.exports.findOneUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleCRUDError(err, res));
};

module.exports.findCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleCRUDError(err, res));
};

module.exports.editUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleCRUDError(err, res));
};

module.exports.editAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleCRUDError(err, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!password || !password.length) {
    res.status(BAD_REQUEST).send({ message: 'Не указан пароль' });
    return;
  }

  if (!email || !email.length) {
    res.status(BAD_REQUEST).send({ message: 'Не указан Email' });
    return;
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.ENCRYPTION_KEY,
        { expiresIn: 604800 },
      );

      res.cookie('jwt', token, {
        maxAge: 604800,
        httpOnly: true,
        sameSite: true,
      }).end();
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
