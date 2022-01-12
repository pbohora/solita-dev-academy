const path = require("path");
const parserAndValidateCsv = require("../helpers/parserAndValidateCsv");
const Survey = require("../models/survey");

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

console.log(partialTechCsv);

const seedSurveys = parserAndValidateCsv(partialTechCsv)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
