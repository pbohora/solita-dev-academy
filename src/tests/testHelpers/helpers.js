const Farm = require('../../models/farm');
const Survey = require('../../models/survey');

const surveys = [
  {
    value: 5.9,
    date: '2018-12-31T22:00:00.000+00:00',
    sensorType: 'pH',
  },
  {
    value: 80,
    date: '2019-12-31T22:00:00.000+00:00',
    sensorType: 'temperature',
  },
  {
    value: 60,
    date: '2020-12-31T22:00:00.000+00:00',
    sensorType: 'rainFall',
  },
];
const farmData = { name: 'test farm' };

const initialDataLoad = async () => {
  await Survey.deleteMany({});
  await Farm.deleteMany({});
  const newFarm = new Farm(farmData);
  await newFarm.save();

  const farm = newFarm.toJSON();

  const modifiedSurveys = surveys.map((survey) => ({
    ...survey,
    farm: farm.id,
  }));

  const savedSurvays = await Survey.insertMany(modifiedSurveys);
  newFarm.surveys = [
    ...newFarm.surveys,
    ...savedSurvays.map((survey) => survey._id),
  ];

  await newFarm.save();
};

module.exports = { initialDataLoad };
