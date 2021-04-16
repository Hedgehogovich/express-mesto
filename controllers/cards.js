const Card = require('../models/card');
const { handleCRUDError } = require('../utils/handleCRUDError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleCRUDError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleCRUDError(err, res));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => handleCRUDError(err, res));
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
    .catch((err) => handleCRUDError(err, res));
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
    .catch((err) => handleCRUDError(err, res));
};
