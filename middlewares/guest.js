const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    next();

    return;
  }

  try {
    jwt.verify(token, process.env.ENCRYPTION_KEY);
    res.status(403).end();
  } catch (err) {
    next();
  }
};
