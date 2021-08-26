require('dotenv').config();

const { PORT } = process.env;
const { SECRET } = process.env;
const { SALTROUNDS } = process.env;
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
module.exports = {
  PORT,
  MONGODB_URI,
  SALTROUNDS,
  SECRET,
};
