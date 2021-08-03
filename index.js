const http = require('http');
const app = require('./app');
const { info } = require('./utils/logger');
const { PORT } = require('./utils/config');

const server = http.createServer(app);

server.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
