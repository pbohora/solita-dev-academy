const path = require("path");
const parserAndValidateCsv = require("../helpers/parserAndValidateCsv");
const Survey = require("../models/survey");

const seedSurveys = parserAndValidateCsv(
  path.resolve(__dirname, "../csv_files", "ossi_farm.csv")
);

console.log(seedSurveys);
