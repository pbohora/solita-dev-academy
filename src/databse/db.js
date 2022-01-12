const mongoose = require('mongoose');
const config = require('../config');

const connectDb = (url = config.dbUrl, opts = {}) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
