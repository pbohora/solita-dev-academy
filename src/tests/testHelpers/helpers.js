const Farm = require("../../models/farm");
const Survey = require("../../models/survey");

const surveys = [
  {
    value: 5.9,
    date: "2018-12-31T22:00:00.000+00:00",
    sensorType: "pH",
  },
  {
    value: 80,
    date: "2019-12-31T22:00:00.000+00:00",
    sensorType: "temperature",
  },
  {
    value: 60,
    date: "2020-12-31T22:00:00.000+00:00",
    sensorType: "rainFall",
  },
];
const farmData = { name: "test farm" };

const initialDataLoad = async () => {
  await Survey.deleteMany({});
  await Farm.deleteMany({});
  const farm = new Farm(farmData);
  await farm.save();
  const savedFarm = farm.toJSON();

  const modifiedSurveys = surveys.map((survey) => ({
    ...survey,
    farm: savedFarm.id,
  }));

  const savedSurvays = await Survey.insertMany(modifiedSurveys);
  farm.surveys = [...farm.surveys, ...savedSurvays.map((survey) => survey._id)];

  await farm.save();
};

module.exports = { initialDataLoad };
