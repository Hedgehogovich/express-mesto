const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);
app.use((req, res, next) => {
  req.user = {
    _id: '60787d0b53733e1aa34b72af',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(3000);
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
