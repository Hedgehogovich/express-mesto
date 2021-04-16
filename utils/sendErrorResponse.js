module.exports.sendErrorResponse = (res, status, message) => {
  res.status(status).send({ message });
};
