require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");

const surveyRouter = require("./routes/survey");
const farmRouter = require("./routes/farm");
const unknownEndpoint = require("./middlewares/unknownEndpointHandler");
const errorHandler = require("./middlewares/errorHandlers");

const app = express();
app.use(json());

app.use("/api/farms", farmRouter);
app.use("/api/surveys", surveyRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
