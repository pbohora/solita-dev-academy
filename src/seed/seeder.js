const path = require("path");
const parserAndValidateCsv = require("../helpers/parserAndValidateCsv");
const Survey = require("../models/survey");

const seedSurveys = parserAndValidateCsv(
  path.resolve(__dirname, "../csv_files", "partialTech.csv")
)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
