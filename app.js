const express = require('express');

const app = express();

const cors = require('cors');

const mongoose = require('mongoose');

const { MONGODB_URI } = require('./utils/config');

const Router = require('./controllers/blogs');

const middleware = require('./utils/middleware');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', Router);
app.use(middleware.errorHandler);
