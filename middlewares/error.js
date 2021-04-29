const mongoose = require('mongoose');
const { ConflictError } = require('../utils/errors/ConflictError');
const { UnauthorizedError } = require('../utils/errors/UnauthorizedError');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { InternalServerError } = require('../utils/errors/InternalServerError');
const { BadRequestError } = require('../utils/errors/BadRequestError');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../utils/httpsErrorCodes');

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  switch (err.name) {
    case mongoose.Error.ValidationError.name:
    case mongoose.Error.CastError.name:
      res.status(BAD_REQUEST).send({ message: 'Некорректные данные' });
      return;
    case mongoose.Error.DocumentNotFoundError.name:
      res.status(NOT_FOUND).send({ message: 'Запрашиваемые данные не найдены' });
      break;
    case BadRequestError.name:
    case InternalServerError.name:
    case NotFoundError.name:
    case UnauthorizedError.name:
    case ConflictError.name:
      res.status(err.statusCode).send({ message: err.message });
      break;
    default:
      console.error(err, err.name, err.message);
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка' });
  }
};
