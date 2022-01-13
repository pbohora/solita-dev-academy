require("dotenv").config();
const mongoose = require("mongoose");
const config = require("../config");

const connectDb = async (url = config.dbUrl) => {
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const closeDatabase = async () => {
  //await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
};

module.exports = { connectDb, closeDatabase };
