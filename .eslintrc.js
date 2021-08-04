module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    indent: ['error', 2],
    'no-plusplus': 0,
  },
};
