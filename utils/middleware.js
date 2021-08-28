const logger = require('./logger');
const jwt = require('jsonwebtoken')
const config = require('./config')

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method);
  logger.info('Path: ', req.path);
  logger.info('Body: ', req.body);
  logger.info('---');
  next();
};

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === 'Password length') {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }
  next(error);
};

const tokenExtractor = (req,res,next) => {
  const aut = req.get('authorization')
  if(aut && aut.toLowerCase().startsWith('bearer ')){
    req.token = aut.substring(7)
  }
  next()
}

const userExtractor = (req,res,next) => {
  const decodedToken = jwt.verify(req.token,config.SECRET)
  if(!req.token || !decodedToken.id){
    return res.status(401).json({error: 'token missing or invalid'})
  }else{
    req.user = decodedToken.id
  }
  next()
}

module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
