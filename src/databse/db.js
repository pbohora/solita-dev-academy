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
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.remove();
  }
  await mongoose.disconnect();
};

module.exports = { connectDb, closeDatabase };
