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
const noorasFarmCsv = path.resolve(
  __dirname,
  "../csv_files",
  "Nooras_farm.csv"
);

//Database connection
mongoose
  .connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => {
    console.log("error connecting database", error);
  });

//parse and save data to database
const parseAndSaveToDb = async (file) => {
  try {
    const surveyData = await parserAndValidateCsv(file);

    //add farm to the database
    const newFarm = new Farm({ name: surveyData.farm });
    const farm = await newFarm.save();
    const savedFarm = farm.toJSON();

    // add survey data to the database
    const modifiedSurveyData = surveyData.data.map((survey) => ({
      value: survey.value,
      date: survey.datetime,
      sensorType: survey.sensorType,
      farm: savedFarm.id,
    }));

    const savedSurvays = await Survey.insertMany(modifiedSurveyData);
    farm.surveys = [
      ...farm.surveys,
      ...savedSurvays.map((survey) => survey._id),
    ];
    await farm.save();
  } catch (error) {
    console.log(error);
  }
};

const seed = async () => {
  await Farm.deleteMany({});
  await Survey.deleteMany({});

  //parse and save partialTech.csv
  await parseAndSaveToDb(partialTechCsv);

  //parse and save friman_metsola.csv
  await parseAndSaveToDb(frimanMetsolaCsv);

  //parse and save Nooras_farm.csv
  await parseAndSaveToDb(noorasFarmCsv);

  //parse and save ossi_farm.csv
  await parseAndSaveToDb(ossiFarmCsv);
};

seed().then(() => {
  mongoose.connection.close();
});
