const { NOT_FOUND } = require('../httpsErrorCodes');

class NotFoundError extends Error {
  constructor(...props) {
    super(...props);
    this.statusCode = NOT_FOUND;
    this.name = 'NotFoundError';
  }
}

module.exports.NotFoundError = NotFoundError;
