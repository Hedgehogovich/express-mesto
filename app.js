const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const guestMiddleware = require('./middlewares/guest');
const errorMiddleware = require('./middlewares/error');
const { createUser, login } = require('./controllers/users');

require('dotenv').config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(3000);
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.post('/signin', guestMiddleware, login);
app.post('/signup', guestMiddleware, createUser);

app.use(errorMiddleware);
