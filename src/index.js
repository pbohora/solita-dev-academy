const app = require('./app');
const http = require('http');

const server = http.createServer(app);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
