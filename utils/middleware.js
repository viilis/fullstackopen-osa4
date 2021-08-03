const logger = require('./logger');

const requestLogger = (req, next) => {
  logger.info('Method: ', req.method);
  logger.info('Path: ', req.path);
  next();
};

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = {
  requestLogger,
  errorHandler,
};