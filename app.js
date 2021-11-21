const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');

const BRouter = require('./controllers/blogs');
const URouter = require('./controllers/users');
const LRouter = require('./controllers/login');
const TRouter = require('./controllers/testing');

const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/users', URouter.userRouter);
app.use('/api/login', LRouter.loginRouter);
app.use('/api/blogs', BRouter.blogRouter);
app.use('/api/testing', TRouter.testRouter);
app.use(middleware.errorHandler);

module.exports = app;
