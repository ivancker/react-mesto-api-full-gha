require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser'); // без этого пост не работает
const helmet = require('helmet');
// const corsConfig = require('./middlewares/cors');
const handleError = require('./middlewares/handleError');
const routers = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();
app.use(cors({
  origin: ['https://mestoo.nomoreparties.sbs', 'https://mestoo.nomoreparties.sbs/'],
}));
app.use(helmet());
app.use(bodyParser.json()); // подключение body-parser к app
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routers);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
