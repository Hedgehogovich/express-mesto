const mongoose = require('mongoose');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('./errorCodes');

function sendErrorResponse(res, status, message) {
  res.status(status).send({ message });
}

module.exports.handleCRUDError = (err, res) => {
  if (
    err instanceof mongoose.Error.ValidationError
    || err instanceof mongoose.Error.CastError
  ) {
    sendErrorResponse(res, BAD_REQUEST, 'Некорректные данные');
    return;
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    sendErrorResponse(res, NOT_FOUND, 'Запрашиваемые данные не найдены');
    return;
  }

  sendErrorResponse(res, INTERNAL_SERVER_ERROR, 'Произошла ошибка');
};
