const mongoose = require('mongoose');
const User = require('../models/user');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../utils/errorCodes');
const { sendErrorResponse } = require('../utils/sendErrorResponse');

function handleUserQueryError(err, res) {
  if (
    err instanceof mongoose.Error.ValidationError
    || err instanceof mongoose.Error.CastError
  ) {
    sendErrorResponse(res, BAD_REQUEST, 'Некорректные данные');
    return;
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    sendErrorResponse(res, NOT_FOUND, 'Запрашиваемый пользователь не найден');
    return;
  }

  sendErrorResponse(res, INTERNAL_SERVER_ERROR, 'Произошла ошибка');
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => sendErrorResponse(res, INTERNAL_SERVER_ERROR, 'Произошла ошибка'));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserQueryError(err, res));
};

module.exports.findOneUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleUserQueryError(err, res));
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
    .catch((err) => handleUserQueryError(err, res));
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
    .catch((err) => handleUserQueryError(err, res));
};
