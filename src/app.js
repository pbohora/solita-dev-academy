require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');

const surveyRouter = require('./routes/survey');

const app = express();
app.use(json());

app.use('/api/surveys', surveyRouter);

module.exports = app;
