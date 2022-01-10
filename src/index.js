const app = require('./app');
const config = require('./config');
const connectDb = require('./databse/db');

const http = require('http');

const server = http.createServer(app);

connectDb()
  .then(() => {
    console.log('Databse is connected');
  })
  .catch((error) => {
    console.log('error connecting database', error);
  });

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
