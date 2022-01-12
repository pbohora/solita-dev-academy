require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const config = require("../config");
const parserAndValidateCsv = require("../helpers/parserAndValidateCsv");
const Survey = require("../models/survey");
const Farm = require("../models/farm");

const partialTechCsv = path.resolve(
  __dirname,
  "../csv_files",
  "PartialTech.csv"
);

const frimanMetsolaCsv = path.resolve(
  __dirname,
  "../csv_files",
  "friman_metsola.csv"
);

const ossiFarmCsv = path.resolve(__dirname, "../csv_files", "ossi_farm.csv");

const NoorasFarmCsv = path.resolve(
  __dirname,
  "../csv_files",
  "Nooras_farm.csv"
);

mongoose
  .connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Databse is connected");
  })
  .catch((error) => {
    console.log("error connecting database", error);
  });

console.log(partialTechCsv);

const seed = async () => {
  try {
    const seedSurveys = await parserAndValidateCsv(partialTechCsv);
    console.log(seedSurveys);
  } catch (error) {
    console.log(error);
  }
};

seed().then(() => {
  mongoose.connection.close();
});
