const surveyRouter = require('express').Router();
const Survey = require('../models/survey');

surveyRouter.get('/', async (req, res) => {
  try {
    const surveys = await Survey.find({});
    res.status(200).json(surveys.map((survey) => survey.toJSON()));
  } catch (error) {
    res.status(400).json({ error: 'error at router ' + error });
  }
});

module.exports = surveyRouter;
