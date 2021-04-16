const mongoose = require('mongoose');
const Card = require('../models/card');
const { INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND } = require('../utils/errorCodes');
const { sendErrorResponse } = require('../utils/sendErrorResponse');

function handleCardQueryError(err, res) {
  if (
    err instanceof mongoose.Error.ValidationError
    || err instanceof mongoose.Error.CastError
  ) {
    sendErrorResponse(res, BAD_REQUEST, 'Некорректные данные');
    return;
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    sendErrorResponse(res, NOT_FOUND, 'Запрашиваемая карточка не найдена');
    return;
  }

  sendErrorResponse(res, INTERNAL_SERVER_ERROR, 'Произошла ошибка');
}

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => sendErrorResponse(res, INTERNAL_SERVER_ERROR, 'Произошла ошибка'));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleCardQueryError(err, res));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => handleCardQueryError(err, res));
};

module.exports.addLike = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => handleCardQueryError(err, res));
};

module.exports.dislikeLike = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => handleCardQueryError(err, res));
};
